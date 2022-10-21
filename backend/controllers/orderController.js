import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = await Order.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(order);
  }
});

export const getOrderItems = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// export const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     (order.isPaid = true), (order.paidAt = Date.now());
//     order.paymentResult = {
//       id: req.body.id,
//       statuse: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     };
//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

export const updatePaystack = asyncHandler(async (req, res) => {
  const { id, reference } = req.body;
  const order = await Order.findById(id);
  if (order) {
    const update = await Order.findByIdAndUpdate(id, {
      payStackReference: reference,
      isPaid: true,
      paidAt: new Date(),
    });

    await update.save();

    const getOrder = await Order.findById(id);
    if (update) {
      res.json({
        hasError: false,
        message: "Payment Successful",
        update,
        getOrder,
      });
    } else {
      res.status(404);
      throw new Error("Somthing Went Wrong");
    }
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});
