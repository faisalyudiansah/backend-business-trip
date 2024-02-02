const calculateDistance = require("../helpers/calculateDistance")
const { Business, Location, Category, Sequelize } = require("../models")

class MainController {
    static async getBusinesses(req, res, next) {
        try {
            let center = {
                longitude: -73.99429321289062,
                latitude: 40.70544486444615
            }
            let businesses = await Business.findAll({
                include: [
                    {
                        model: Category,
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt'],
                        },
                        through: { attributes: [] }
                    },
                    {
                        model: Location,
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt', 'BusinessId'],
                        },
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            })
            businesses.forEach(business => {
                let distance = calculateDistance(
                    center.latitude,
                    center.longitude,
                    business.latitude,
                    business.longitude
                )
                business.distance = Number(distance.toFixed(5))
            })
            res.status(200).json({
                businesses,
                total: businesses.length,
                region: {
                    center
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MainController