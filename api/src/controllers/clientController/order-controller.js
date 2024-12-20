const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const User = require("../../models/User");
const Product = require("../../models/Product");
const nodeMailer = require("nodemailer");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/client/paypal-return",
        cancel_url: "http://localhost:5173/client/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.productname,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        const newCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newCreatedOrder.save();

        const approvalUrl = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalUrl,
          orderId: newCreatedOrder._id,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymnetId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymnetId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.productname}`,
        });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    var user = await User.findById(order.userId);
    console.log(user, "user order");

    var transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dvtrieu03@gmail.com",
        pass: "ilumvqutexayuoah",
      },
    });

    const html = `<h2>Xin chào, ${user.username}</h2><br/> +
                  <p>Đơn hàng #${order._id} của bạn đã được thanh toán thành công.</p><br/> +
                  <p>Cảm ơn bạn đã mua hàng tại cửa hàng chúng tôi.</p><br/> +
                  <p>Hãy kiểm tra email thường xuyên để nhận thông tin đơn hàng và thông tin khuyến mãi nhé!</p>`;

    var mailOptions = {
      from: "Model Shop <dvtrieu03@gmail.com>",
      to: "dvtrieu03@gmail.com",
      subject: "XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG",
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

const getAllOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        title: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        title: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUserId,
  getOrderDetails,
};
