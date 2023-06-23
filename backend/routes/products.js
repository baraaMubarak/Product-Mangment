const {Router} = require('express')
const productController = require('../controller')

const router = Router()

router.post('/add',productController.product.saveProduct)
router.get('/getByCode',productController.product.getProductById)

module.exports = router