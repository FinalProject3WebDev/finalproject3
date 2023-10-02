const router = require('express').Router();
const UserController = require('../controllers/userController');
const CartController = require('../controllers/cartController');
const OrderController = require('../controllers/orderController');
const ProductController = require('../controllers/productController');
const ProductCategoryController = require('../controllers/productCategoryController');
const { isAdmin } = require('../middleware/authorization'); 

const { authentication, sendUserData } = require('../middleware/authentication');

// Product
router.get('/products', ProductController.getAllProducts);
router.get('/categories', ProductCategoryController.getAllCategories);

// Users 
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// -------------------------- ROUTES YANG PERLU AUTORISASI --------------------------
router.post('/products', authentication, isAdmin, ProductController.createProduct); 
router.delete('/products/:productId', authentication, isAdmin, ProductController.deleteProduct); 
router.put('/products/:productId', authentication, isAdmin, ProductController.editProduct); 

// -------------------------- ROUTES YANG PERLU AUTENTIKASI --------------------------

// Authentication
router.use(authentication);
router.get('/profile', UserController.getUserProfile);
router.put('/profile/edit', UserController.editProfile);

// Cart 
router.get('/cart/mycart', CartController.getCartItems);
router.post('/cart/:productId', CartController.addToCart);
router.delete('/cart/:itemId', CartController.removeCartItem);

// Order 
router.post('/order/create', OrderController.createOrder);
router.get('/order/history', OrderController.getOrders);
router.delete('/order/:orderId', OrderController.deleteOrderById);

module.exports = router;
