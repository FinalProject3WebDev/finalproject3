const { Product, Order, OrderItem, Cart, CartItem } = require('../models');

class OrderController {

    // create order when user checkout
    static createOrder(req, res) {
        const userId = res.locals.user.id;
        const shippingAddress = req.body.shippingAddress;
    
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
            // check if the cart exists
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            
            const totalPrice = cart.CartItems.reduce((sum, cartItem) => {
                return sum + (cartItem.Product.price * cartItem.quantity);
            }, 0);
    
            Order.create({
                userId: userId,
                totalPrice: totalPrice, 
                shippingAddress: shippingAddress,
            })
            .then(order => {
                const orderItemPromises = cart.CartItems.map(cartItem => {
                    return OrderItem.create({
                        orderId: order.id,
                        productId: cartItem.Product.id, 
                        quantity: cartItem.quantity, 
                        price: cartItem.Product.price, 
                    });
                });
    
                Promise.all(orderItemPromises)
                .then(() => {
                    // clear the cart
                    CartItem.destroy({
                        where: {
                            cartId: cart.id,
                        },
                    })
                    .then(() => {
                        res.status(200).json({ message: 'Order created successfully' });
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).json({ message: 'Failed to clear cart' });
                    });
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ message: 'Failed to create order items' });
                });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to create order' });
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Failed to find cart' });
        });
    }
    
    static getOrders(req, res) {
        const userId = res.locals.user.id;
        Order.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: OrderItem,
                    include: [Product],
                },
            ],
        })
            .then(orders => {
                res.status(200).json(orders);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to find orders' });
            });
    }

    static deleteOrderById(req, res) {
        const orderId = req.params.orderId;

        Order.destroy({
            where: {
                id: orderId,
            },
        })
        .then(deletedRows => {
            if (deletedRows > 0) {
                res.status(204).json({ message: 'Order deleted successfully' });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Failed to delete order' });
        });
    }
    
}

module.exports = OrderController;