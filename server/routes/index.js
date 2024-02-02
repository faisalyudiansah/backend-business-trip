const router = require('express').Router()
const MainController = require('../controllers/MainController')
const errorHandler = require('../middlewares/errorHandlers')

router.post('/business', MainController.createBusiness)
router.get('/business/search', MainController.getSearchBusinesses)

router.use(errorHandler)

module.exports = router