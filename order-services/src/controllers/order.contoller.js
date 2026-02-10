import axios from "axios";
import orderModel from "../models/order.model.js";

export const createOrder = async (req, res) => {
  const user = req.user;
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  try {
    // fetch user order from cart service
    const cartResponse = await axios.get(`http://localhost:4003/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
