const express= require('express');
const productController = require('../controller/productController');

const router=express.Router();

router.post('/addProduct', productController.addProduct);
router.post('/registerProduct', productController.registerProduct);
router.post('/productImg', productController.productImg);
router.get('/productDetails', productController.productDetails);
router.get('/productDetails/:productId', productController.productDetailsById);
router.get('/avgPrice', productController.avgPrice);
router.post('/addDetails', productController.addDetails);
router.post('/addRating', productController.addRating);

module.exports=router;

