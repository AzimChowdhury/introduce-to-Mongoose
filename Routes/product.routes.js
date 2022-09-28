const express = require('express');
const router = express.Router()
const productController = require("../Controller/product.controller");


router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)


router.route('/:id')
    .patch(productController.updateProduct)


module.exports = router