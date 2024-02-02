const router = require('express').Router()
const MainController = require('../controllers/MainController')
const errorHandler = require('../middlewares/errorHandlers')

router.post('/business', MainController.createBusiness)
router.put('/business/:idBusiness', MainController.updateBusiness)
// router.delete('/business', MainController.deleteBusiness)
router.get('/business/search', MainController.getSearchBusinesses)

router.use(errorHandler)

module.exports = router