const router = require('express').Router();
const UserController = require('../controllers/userController');
const CartController = require('../controllers/cartController');
const OrderController = require('../controllers/orderController');

const { authentication, sendUserData } = require('../middleware/authentication');

// Users 
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Authentication
router.use(authentication);
router.get('/profile', UserController.getUserProfile);

// Cart 
router.get('/cart/mycart', CartController.getCartItems);
router.post('/cart/:productId', CartController.addToCart);

// Order 
router.post('/order/create', OrderController.createOrder);
router.get('/order/history', OrderController.getOrderHistory);
router.get('/order/:orderId', OrderController.getOrderDetails); //blm tau perlu ato ga

module.exports = router;

