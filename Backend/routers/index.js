const router = require('express').Router();
const UserController = require('../controllers/userController');
const CartController = require('../controllers/cartController');
const OrderController = require('../controllers/orderController');
const ProductController = require('../controllers/productController');
const ProductCategoryController = require('../controllers/productCategoryController');
const { isAdmin } = require('../middleware/authorization'); 
const cors = require('cors')

const { authentication, sendUserData } = require('../middleware/authentication');

router.use(cors())

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
router
  .use(authentication)
  .get("/profile", UserController.getUserProfile)
  .put("/profile/edit", UserController.editProfile)

  // Cart
  .get("/cart/mycart", CartController.getCartItems)
  .post("/cart/:productId", CartController.addToCart)
  .delete("/cart/:itemId", CartController.removeCartItem)

  // Order
  .post("/order/create", OrderController.createOrder)
  .get("/order/history", OrderController.getOrders)
  .delete("/order/:orderId", OrderController.deleteOrderById);

module.exports = router;
