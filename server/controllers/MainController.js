const { Business, Location, Category, BusinessCategory, Sequelize } = require("../models")
const calculateDistance = require("../helpers/calculateDistance")
const createDisplayAddress = require("../helpers/createDisplayAddress")

class MainController {
    static async createBusiness(req, res, next) {
        try {
            let { Location: locationBusiness, Categories } = req.body
            if (!locationBusiness) {
                throw { name: "Location is required" }
            }
            if (!Categories || Categories.length === 0) {
                throw { name: "Categories is required" }
            }
            let result = await Business.create({
                alias: req.body.alias,
                name: req.body.name,
                image_url: req.body.image_url,
                is_closed: req.body.is_closed,
                url: req.body.url,
                latitude: req.body.coordinates.latitude,
                longitude: req.body.coordinates.longitude,
                transactions: req.body.transactions,
                price: req.body.price,
                phone: req.body.phone,
                display_phone: req.body.display_phone,
                distance: null
            })
            Categories.forEach(async (ctgId) => {
                await BusinessCategory.create({
                    BusinessId: result.dataValues.id,
                    CategoryId: ctgId
                })
            })
            let locationData = {
                ...locationBusiness,
                BusinessId: result.dataValues.id
            }
            await Location.create(locationData)
            return res.status(201).json({ message: `${req.body.name} successfully created` })
        } catch (error) {
            next(error)
        }
    }

    static async updateBusiness(req, res, next) {
        try {
            let { idBusiness } = req.params
            let verifyBusiness = await Business.findByPk(idBusiness)
            if(!verifyBusiness){
                throw { name: "Cannot found a business with that ID" }
            }
            let { Location: locationBusiness, Categories } = req.body
            if (!locationBusiness) {
                throw { name: "Location is required" }
            }
            if (!Categories || Categories.length === 0) {
                throw { name: "Categories is required" }
            }
            await Business.update({
                alias: req.body.alias,
                name: req.body.name,
                image_url: req.body.image_url,
                is_closed: req.body.is_closed,
                url: req.body.url,
                latitude: req.body.coordinates.latitude,
                longitude: req.body.coordinates.longitude,
                transactions: req.body.transactions,
                price: req.body.price,
                phone: req.body.phone,
                display_phone: req.body.display_phone,
                distance: null
            }, { where: { id: idBusiness } })
            await BusinessCategory.destroy({ where: { BusinessId: idBusiness } })
            await Promise.all(Categories.map(async (ctgId) => {
                await BusinessCategory.create({
                    BusinessId: idBusiness,
                    CategoryId: ctgId
                })
            }))
            await Location.update({
                address1: locationBusiness.address1,
                address2: locationBusiness.address2,
                address3: locationBusiness.address3,
                city: locationBusiness.city,
                zip_code: locationBusiness.zip_code,
                country: locationBusiness.country,
                state: locationBusiness.state,
            }, { where: { BusinessId: idBusiness } })
            return res.status(200).json({ message: `${req.body.name} has been updated` })
        } catch (error) {
            next(error)
        }
    }

    static async deleteBusiness(req, res, next) {
        try {
            let business = await Business.findByPk(req.params.idBusiness)
            if (!business) {
                throw { name: "Cannot found a business with that ID" }
            } else {
                await business.destroy()
                res.status(200).json({ message: `Business success to delete` })
            }
        } catch (error) {
            next(error)
        }
    }

    static async getSearchBusinesses(req, res, next) {
        try {
            let { location, sort_by, limit, open_now, categories } = req.query
            let queryOptions = MainController.buildQueryOptions({ location, open_now, categories })
            let businesses = await Business.findAll({
                include: [
                    {
                        model: Category,
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt'],
                        },
                        where: queryOptions.category,
                        through: { attributes: [] }
                    },
                    {
                        model: Location,
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt', 'BusinessId'],
                        },
                        where: queryOptions.location
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                where: queryOptions.business,
                limit: limit ? limit : null,
            })
            if (businesses.length === 0) {
                throw { name: "Data not found" }
            }
            MainController.processBusinessData(businesses, sort_by)
            return res.status(200).json({
                businesses,
                total: businesses.length,
                region: {
                    center: MainController.defaultCenter
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static buildQueryOptions({ location, open_now, categories }) {
        let queryOptions = {
            business: {},
            category: {},
            location: {}
        }
        if (location) {
            queryOptions.location = {
                city: {
                    [Sequelize.Op.iLike]: `%${location}%`
                }
            }
        }
        if (categories) {
            queryOptions.category = {
                title: {
                    [Sequelize.Op.iLike]: `%${categories}%`
                }
            }
        }
        if (open_now !== undefined) {
            if (open_now.toLowerCase() === 'true') {
                queryOptions.business.is_closed = false
            } else if (open_now.toLowerCase() === 'false') {
                queryOptions.business.is_closed = true
            }
        }
        return queryOptions
    }

    static processBusinessData(businesses, sort_by) {
        businesses.forEach(business => {
            let distance = calculateDistance(
                MainController.defaultCenter.latitude,
                MainController.defaultCenter.longitude,
                business.latitude,
                business.longitude
            )
            let display_address = createDisplayAddress(business.Location.dataValues)
            business.distance = Number(distance.toFixed(5))
            business.dataValues.coordinates = {
                latitude: business.latitude,
                longitude: business.longitude
            }
            business.Location.dataValues.display_address = display_address
            delete business.dataValues.latitude
            delete business.dataValues.longitude
        })
        switch (sort_by) {
            case "rating":
                businesses.sort((a, b) => b.rating - a.rating)
                break
            case "review_count":
                businesses.sort((a, b) => b.review_count - a.review_count)
                break
            default:
                break
        }
    }
}

MainController.defaultCenter = {
    longitude: -73.99429321289062,
    latitude: 40.70544486444615
}

module.exports = MainController
