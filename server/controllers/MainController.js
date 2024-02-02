const { Business, Location, Category, Sequelize } = require("../models")
const calculateDistance = require("../helpers/calculateDistance")
const createDisplayAddress = require("../helpers/createDisplayAddress")

class MainController {
    static async getBusinesses(req, res, next) {
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
