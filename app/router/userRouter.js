const express = require('express');
const userController = require('../controller/userController');

const router=express.Router();

router.post('/create',userController.createUser);
router.post('/login', userController.userLogin);

module.exports = router;