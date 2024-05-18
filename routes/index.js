const express = require('express');
const farmerController = require('../controllers/farmerController');
const userController = require('../controllers/userController');
const router = express.Router()
const commonMiddleware = require('../middlewares/commonMiddleware');

//farmers routes
router.get('/farmers', farmerController.getAllFarmers);

router.post('/farmer', commonMiddleware.hasRequestBody, farmerController.createFarmer);
router.get('/farmer/:email', commonMiddleware.queryContainsEmail, farmerController.getFarmerByEmail);
//router.put('/farmer/:email', commonMiddleware.hasRequestBody, farmerController.updateFarmerByEmail);
router.delete('/farmer/:id', commonMiddleware.queryContainsEmail, farmerController.deleteFarmerByEmail);

//user routes
router.get('/users', userController.getAllUsers);
router.get('/user/:email', commonMiddleware.queryContainsEmail, userController.getUserByEmail);
router.post('/user', commonMiddleware.hasRequestBody, userController.postNew);
//router.put();
router.delete('/user/:id', commonMiddleware.queryContainsId, userController.deleteUserById);

module.exports = router ;
