function errorHandler(error, req, res, next) {
    console.log(error)

    let statusCode = 500
    let message = 'Internal Server Error'

    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            message = error.errors[0].message
            break
        case "Categories is required":
            statusCode = 400
            message = error.name
            break
        case "Location is required":
            statusCode = 400
            message = error.name
            break
        case 'Data not found':
            statusCode = 404
            message = error.name
            break
        case 'Cannot found a business with that ID':
            statusCode = 404
            message = error.name
            break
    }
    res.status(statusCode).json({ message })
}

module.exports = errorHandler