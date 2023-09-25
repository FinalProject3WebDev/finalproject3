const router = require('express').Router();
const UserController = require('../controllers/userController');
const CartController = require('../controllers/cartController');
const OrderController = require('../controllers/orderController');
const ProductController = require('../controllers/productController');

const { authentication, sendUserData } = require('../middleware/authentication');

// Product
router.get('/products', ProductController.getAllProducts);
// router.post('/products', ProductController.addProduct);
// router.put('/products/:productId', ProductController.editProduct);
// router.delete('/products/:productId', ProductController.deleteProduct);

// Users 
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// -------------------------- ROUTES YANG PERLU AUTENTIKASI --------------------------

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

