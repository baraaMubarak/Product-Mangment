const {Router} = require('express')
const productController = require('../controller')
const multer = require("multer");

const router = Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        global.imageName = Date.now() + '-' + file.originalname;
        cb(null, global.imageName );

    },

});
const upload = multer({storage: storage});
router.post('/add', upload.single('image'), productController.product.saveProduct)
router.get('/getByCode', productController.product.getProductById)
router.get('/getAll', productController.product.getAllProduct)

module.exports = router