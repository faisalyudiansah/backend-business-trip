const router = require('express').Router()
const MainController = require('../controllers/MainController')

router.get('/business/search', MainController.getBusinesses)

module.exports = router