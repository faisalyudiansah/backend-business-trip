const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models');
async function authentication(req, res, next) {
    try {
        let { authorization } = req.headers
        if (!authorization) {
            throw { name: "Invalid Token" }
        }
        let rawToken = authorization.split(' ')
        if (rawToken[0] !== "Bearer") {
            throw { name: "Invalid Token" }
        }
        let checkVerifyToken = verifyToken(rawToken[1])
        if (checkVerifyToken === "Invalid Token") {
            throw { name: "Invalid Token" }
        }
        let findUser = await User.findByPk(checkVerifyToken.id)
        if (!findUser) {
            throw { name: "Invalid Token" }
        }
        req.user = findUser
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication