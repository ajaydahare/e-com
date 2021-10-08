import { Order } from "../models/order.js";

export const getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("product.product", "name price")
    .exec((error, order) => {
      if (error) {
        return res.status(400).json({
          error: "no order found",
        });
      }
      req.order = order;
      next();
    });
};

export const createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const newOrder = new Order(req.body.order);
  newOrder.save((error, order) => {
    if (error) {
      return res.status(400).json({
        error: "failed to create order",
      });
    }
    res.json(order);
  });
};

export const getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: "no orders found",
        });
      }
      res.json(orders);
    });
};

export const getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumvalues);
};

export const updateOrderStatus = (req, res) => {
  Order.findByIdAndUpdate(
    { _id: req.order._id },
    { $set: { status: req.body.status } },
    (error, order) => {
      if (error) {
        return res.status(400).json({
          error: "cannot update order status",
        });
      }
      res.json(order);
    }
  );
};
