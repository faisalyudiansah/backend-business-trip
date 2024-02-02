const router = require('express').Router()
const MainController = require('../controllers/MainController')
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandlers')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.post('/business', MainController.createBusiness)
router.put('/business/:idBusiness', MainController.updateBusiness)
router.delete('/business/:idBusiness', MainController.deleteBusiness)
router.get('/business/search', MainController.getSearchBusinesses)

router.use(errorHandler)

module.exports = router