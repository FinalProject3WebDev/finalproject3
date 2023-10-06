const { Product, Cart, CartItem } = require('../models');
const { urlPath } = require('../helpers/urlPath');

class CartController {
    // add item to cart
    static addToCart(req, res) {
        const productId = req.params.productId;
        const userId = res.locals.user.id;
        const quantity = req.body.quantity;
    
        // find or create a cart for the user
        Cart.findOrCreate({
            where: {
                userId: userId,
            },
        })
        .then(([cart]) => {
            Product.findByPk(productId)
            .then(product => {
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                CartItem.findOrCreate({
                    where: {
                        cartId: cart.id,
                        productId: productId,
                    },
                    defaults: {
                        quantity: 0,
                        price: 0,
                    },
                })
                .then(([cartItem, created]) => {
                    const productPrice = product.price; 
                    const updatedQuantity = cartItem.quantity + quantity;
                    let updatedPrice = productPrice * updatedQuantity;

                    if (created) {
                        updatedPrice = productPrice * quantity;
                    }
        
                    cartItem.update({
                        quantity: updatedQuantity,
                        price: updatedPrice,
                    })
                    .then(updatedCartItem => {

                        CartItem.sum('price', { where: { cartId: cart.id } })
                        .then(totalPrice => {
                            cart.update({ totalPrice: totalPrice || 0 })
                            .then(() => {
                                res.status(200).json({ message: 'Product added to cart', cartItem: updatedCartItem });
                            })
                            .catch(error => {
                                console.error(error);
                                res.status(500).json({ message: 'Failed to update cart total price' });
                            });
                        })
                        .catch(error => {
                            console.error(error);
                            res.status(500).json({ message: 'Failed to calculate cart total price' });
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).json({ message: 'Failed to update cart item quantity' });
                    });
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ message: 'Failed to find or create cart item' });
                });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to find product' });
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Failed to find or create cart' });
        });
    }

    // see cart items
    static getCartItems(req, res) {
        const userId = res.locals.user.id;

        Cart.findOne({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: CartItem,
                    include: [Product],
                },
            ],
        })
            .then(cart => {
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }

                cart.CartItems = cart.CartItems.map((value) => {
                    value.Product.productImage = urlPath(value.Product.productImage, req)
            
                    return value
                  })

                const totalPrice = cart.CartItems.reduce((sum, cartItem) => {
                    return sum + cartItem.price; 
                }, 0);

                res.status(200).json({ message: 'Cart found', cartItems: cart.CartItems, totalPrice: totalPrice });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to retrieve cart items' });
            });
    }

    static removeCartItem(req, res) {
        const itemId = req.params.itemId;

        CartItem.destroy({
            where: {
                id: itemId,
            },
        })
            .then(deletedRows => {
                if (deletedRows > 0) {
                    res.status(200).json({ message: 'Cart item deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Cart item not found' });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to delete cart item' });
            });
    }
}

module.exports = CartController;