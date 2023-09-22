const router = require('express').Router();
const UserController = require('../controllers/userController');
const CartController = require('../controllers/cartController');

const { authentication, sendUserData } = require('../middleware/authentication');

// Users 
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Authentication
router.use(authentication);

// Cart 
router.get('/cart/mycart', CartController.getCartItems);
router.post('/cart/:productId', CartController.addToCart);

module.exports = router;

