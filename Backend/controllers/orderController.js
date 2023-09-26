const { Order, Cart } = require('../models');

class OrderController {
    // create order when user checkout from cart
    static createOrder(req, res) {
        const userId = res.locals.user.id; 
        const cartItems = req.body.cartItems; 

        // create order
        Order.create({
            userId,
            totalPrice: cartItems.totalPrice,
            shippingAddress: cartItems.shippingAddress,
            orderStatus: 'Pending'

        })
            .then(newOrder => {
                // Create order items for each cart item
                const orderItemsPromises = cartItems.map(cartItem => {
                    return newOrder.createOrderItem({
                        productId: cartItem.productId,
                        quantity: cartItem.quantity,
                        price: cartItem.price,
                    });
                });

                Promise.all(orderItemsPromises)
                    .then(orderItems => {
                        // clear cart
                        Cart.destroy({
                            where: {
                                userId,
                            }
                        })
                            .then(() => {
                                res.status(201).json({ message: 'Order created successfully', order: newOrder });
                            })
                            .catch(error => {
                                console.error(error);
                                res.status(500).json({ message: 'Failed to clear cart after creating the order' });
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
    }

    // get order
    static getOrderHistory(req, res) {
        const userId = res.locals.user.id;

        // Retrieve all orders for the user
        Order.findAll({
            where: {
                userId,
            },
            include: [{
                model: OrderItem,
                include: [Product],
            }],
        })
            .then(orders => {
                res.status(200).json(orders);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to retrieve order history' });
            });
    }

    // get order details
    static getOrderDetails(req, res) {
        const orderId = req.params.orderId;
        Order.findByPk(orderId, {
            include: [{
                model: OrderItem,
                include: [Product],
            }],
        })
            .then(order => {
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }

                res.status(200).json(order);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Failed to retrieve order details' });
            });
    }
}

module.exports = OrderController;
