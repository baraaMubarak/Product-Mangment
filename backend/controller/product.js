const {productModel} = require('../model')
const multer = require('multer');

const saveProduct = (req, res) => {

    if (!req.body.code) {
        res.status(400).json({
            message: 'the code is required'
        })
        return;
    } else if (!req.body.name) {
        res.status(400).json({
            message: 'the name is required'
        })
        return;
    } else if (!req.body.price) {
        res.status(400).json({
            message: 'the price is required'
        })
        return;
    } else if (!req.body.quantity) {
        res.status(400).json({
            message: 'the quantity is required'
        })
        return;
    }else if (!req.body.expirationDate) {
        res.status(400).json({
            message: 'the expiration date is required'
        })
        return;
    }else if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const product = new productModel({
        code: req.body.code,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        expirationDate: req.body.expirationDate,
    })
    product.save();
    res.status(201).json({
        message: 'success'
    })
}
const getProductById = (req, res) => {
    console.log()
    if (!req.query.code) {
        res.status(400).json({
            message: 'the code is required'
        })
        return;
    }
    const product = new productModel({})
    product.getProductByCode(req.query.code, (data) => {
        if(data == null){
            res.status(400).json({
                message:'المنتج غير موجود',
                data: data
            })
        }else {
            res.status(201).json({
                message: null,
                data: data
            })
        }
    })

}
module.exports = {
    saveProduct,
    getProductById
}