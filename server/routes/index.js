const router = require('express').Router()
const MainController = require('../controllers/MainController')
const errorHandler = require('../middlewares/errorHandlers')

router.get('/business/search', MainController.getBusinesses)
router.use(errorHandler)

module.exports = router