const { product, cart } = require('../models');

class CartController {
    // add item to cart
    static addToCart(req, res) {
        const productId = req.params.productId;
        const userId = res.locals.user.id;
        const quantity = req.body.quantity;

        product.findByPk(productId)
            .then(foundProduct => {
                if (!foundProduct) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                cart.findOne({
                    where: {
                        userId,
                        productId,
                    }
                })
                    .then(foundCartItem => {
                        if (foundCartItem) {
                            // update quantity
                            foundCartItem.update({ quantity: foundCartItem.quantity + quantity })
                                .then(updatedCartItem => {
                                    res.status(200).json({ message: 'Product quantity updated in cart', cartItem: updatedCartItem });
                                })
                                .catch(error => {
                                    console.error(error);
                                    res.status(500).json({ message: 'Failed to update cart item quantity' });
                                });
                        } else {
                            // add item to cart
                            cart.create({ userId, productId, quantity })
                                .then(newCartItem => {
                                    res.status(201).json({ message: 'Product added to cart', cartItem: newCartItem });
                                })
                                .catch(error => {
                                    console.error(error);
                                    res.status(500).json({ message: 'Failed to create cart item' });
                                });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).json({ message: 'Failed to find cart item' });
                    });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to find product' });
            });
    }

    // retrieve cart items
    static getCartItems(req, res) {
        const userId = res.locals.user.id;

        cart.findAll({
            where: {
                userId,
            },
            include: [product],
        })
            .then(cartItems => {
                res.status(200).json(cartItems);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to retrieve cart items' });
            });
    }
}

module.exports = CartController;
