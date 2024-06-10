const express = require('express');
const farmerController = require('../controllers/farmerController');
const userController = require('../controllers/userController');
const produceController = require('../controllers/produceController');
const reviewController = require('../controllers/reviewController');
const favouriteController = require('../controllers/favouriteController');
const authController = require('../controllers/authController');
const commonMiddleware = require('../middlewares/commonMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router()
//farmers routes
router.get('/farmers', farmerController.getAllFarmers);

router.post('/farmer', commonMiddleware.hasRequestBody, farmerController.createFarmer);
//recheck on this request.
//router.get('/farmer/:email', commonMiddleware.queryContainsEmail, farmerController.getFarmerByEmail);
router.put('/farmer/:id', farmerController.updateFarmerById);
router.delete('/farmer/:id', commonMiddleware.queryContainsId, farmerController.deleteFarmerById);

//user routes
//edit controller remove secrete keys from being returned
router.get('/users', userController.getAllUsers);
router.get('/user/:userId/favourites', userController.getFavouriteByUser);
router.get('/user/:userId/reviews', userController.getReviewByUser);
router.post('/user', commonMiddleware.hasRequestBody, userController.postNew);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', commonMiddleware.queryContainsId, userController.deleteUserById);

//produce routes
router.get('/products', authMiddleware.checkAuthHeader, produceController.getAllProducts);
router.get('/product/category/:category', produceController.getProductByCategory);
router.get('/product/:id', produceController.getProductById);
router.post('/product', produceController.createNewProduct);
router.put('/product/:id', produceController.updateProductById);
router.delete('/product/:id', produceController.deleteProductById);

//review routes
router.get('/review/:id', reviewController.getReviewById);
router.get('/reviews', reviewController.getAllReviews);
router.post('/review', reviewController.createReview);
//router.put(reviewController);
router.delete('/review/:id', reviewController.deleteReviewId);

// favourite routes.
//router.get('', favouriteController);
router.get('/favourite/:userId/favourites', favouriteController.getFavouritesByUser);
router.post('/favourite', favouriteController.createFavourite);
//do i need a put request to favourites.
//router.put();
router.delete('/favourite/:id', favouriteController.deleteFavouriteById);

//handle user authentication.
router.post('/login', authController.loginUser);
router.post('/token', authController.generateToken);
router.delete('/logout', authController.deleteToken);

module.exports = router ;
