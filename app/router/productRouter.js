const express= require('express');
const productController = require('../controller/productController');

const router=express.Router();

router.post('/addProduct', productController.addProduct);
router.post('/registerProduct', productController.registerProduct);
router.post('/productImg', productController.productImg);
// router.get('/productDetails', productController.productDetails);
router.get('/productDetails/:productId', productController.productDetails);
router.get('/avgPrice', productController.avgPrice);
// router.get('/showProducts', productController.showProducts);

module.exports=router;

