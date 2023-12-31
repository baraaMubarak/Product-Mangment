const {productModel} = require('../model')
const multer = require('multer');
const sharp = require("sharp");
const {unlink} = require("fs");

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
    } else if (!req.body.expirationDate) {
        res.status(400).json({
            message: 'the expiration date is required'
        })
        return;
    } else if (!req.file) {
        return res.status(400).json({error: 'No file uploaded'});
    }

    const product = new productModel({
        code: req.body.code,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        expirationDate: req.body.expirationDate,
        imageUrl: '/uploads/a' + global.imageName,
    })
    product.save();
    // res.status(201).json({
    //     message: 'success'
    // })
    sharp(req.file.path)
        .resize(300, 300)
        .jpeg({ quality: 100 })
        .toFile('uploads/a'+global.imageName, (err, info) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: err.message });
                return;
            }

            unlink(req.file.path, (err) => {
                if (err) {
                    console.error(err);
                }

                // Respond with success message or perform further actions
                res.json({ message: 'success' });
            });

        });
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
        if (data == null) {
            res.status(400).json({
                message: 'المنتج غير موجود',
                data: data
            })
        } else {
            res.status(201).json({
                message: null,
                data: data
            })
        }
    })

}
const getAllProduct = (req, res) => {
    const product = new productModel({})
    product.getAllProducts((data) => {
        res.status(201).json({
            message: null,
            data: data
        })
    })

}
module.exports = {
    saveProduct,
    getProductById,
    getAllProduct
}