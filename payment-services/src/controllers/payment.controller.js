import paymentModel from "../models/payment.model.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import { validatePaymentVerification } from "../../node_modules/razorpay/dist/utils/razorpay-utils.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// this inilized the payment - api
export const createPayment = async (req, res) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  try {
    const orderId = req.params.orderId;

    const orderResponse = await axios.get(
      "http://localhost:4004/api/orders/" + orderId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const price = orderResponse.data.order.totalPrice;

    const order = await razorpay.orders.create(price);

    const payment = await paymentModel.create({
      order: orderId,
      razorpayOrderId: order.id,
      user: req.user.id,
      price: {
        amount: order.amount,
        currency: order.currency,
      },
    });

    return res.status(201).json({ message: "Payment initiated", payment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// this verify the payment - api
export const verifyPayment = async (req, res) => {
  const { razorpayOrderId, paymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  try {
    const isValid = validatePaymentVerification(
      {
        order_id: razorpayOrderId,
        payment_id: paymentId,
      },
      signature,
      secret,
    );
    {
      /* {
    "razorpayOrderId": "order_SD680dQVvmioHV",
    "paymentId":"pay_SD687J97qpWVzy",
    "signature": "2a20a9a0dc7ab85d83a16c281a04743fd15f3dd1bdde4970013bd29864881dab"



} */
      {
        /*DATABSE change -  {
  "price": {
    "amount": 80000,
    "currency": "INR"
  },
  "status": "PENDING",
  "createdAt": {
    "$date": "2026-02-07T02:53:47.959Z"
  },
  "updatedAt": {
    "$date": "2026-02-07T02:54:09.941Z"
  },
  "__v": 0,
  "paymentId": "pay_SD687J97qpWVzy",
  "signature": "2a20a9a0dc7ab85d83a16c281a04743fd15f3dd1bdde4970013bd29864881dab",
  "razorpayOrderId": "order_SD680dQVvmioHV",
  "order": {
    "$oid": "698d729131dc0728d95717f9"
  },
  "user": {
    "$oid": "698d735231dc0728d95717fa"
  }
} */
      }
    } // this data from the payment done  - if error check the details here 

    if (!isValid) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payment = await paymentModel.findOne({
      razorpayOrderId,
      status: "PENDING",
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.paymentId = paymentId;
    payment.signature = signature;
    payment.status = "COMPLETED";

    await payment.save();

    res.status(200).json({ message: "Payment verified successfully", payment });
  } catch (err) {
    console.log("Errror message:", err);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
