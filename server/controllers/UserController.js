const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
class UserController {
    static async register(req, res, next) {
        try {
            let { name, email, password } = req.body
            let result = await User.create({ name, email, password })
            res.status(201).json({
                id: result.id,
                email: result.email,
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            if (!password) {
                throw { name: "Password is required" }
            }
            if (!email) {
                throw { name: "Email is required" }
            }
            let result = await User.findOne({
                where: { email }
            })
            if (!result) {
                throw { name: "Invalid email/password" }
            }
            let checkPassword = comparePassword(password, result.password)
            if (!checkPassword) {
                throw { name: "Invalid email/password" }
            }
            let access_token = signToken(result)
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController