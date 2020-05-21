const router = require('express').Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookController=  require('../controllers/bookingController');

router.get('/',bookController.createBookingCheckout,authController.isLoggedIn,viewController.getOverview);
router.get('/tours/:slug',authController.isLoggedIn,viewController.getTour);
router.get('/login',authController.isLoggedIn,viewController.login)
router.get('/my-tours', authController.protect, viewController.getMyTours)

router.get('/me',authController.protect,viewController.getAccount);
router.post('/submit-user-data', authController.protect,viewController.updateUserData);

module.exports = router