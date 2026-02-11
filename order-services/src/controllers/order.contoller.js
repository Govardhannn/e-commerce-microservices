import axios from "axios";
// import orderModel from "../models/order.model.js";

export const createOrder = async (req, res) => {
  const user = req.user;

  const token =
    req.cookies?.token ||
    req.headers?.authorization?.split(" ")[1];

  try {
    // ✅ Fetch Cart
    const cartResponse = await axios.get(
      "http://localhost:4003/api/cart",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const cartItems = cartResponse.data?.cart?.items || [];
    console.log(cartItems)

    // if (!cartItems.length) {
    //   return res.status(400).json({
    //     message: "Cart is empty",
    //   });
    // }


  } catch (err) {

  console.log("STATUS:", err.response?.status);
  console.log("URL:", err.config?.url);
  console.log("METHOD:", err.config?.method);
  console.log("DATA:", err.response?.data);

  return res.status(err.response?.status || 500).json({
    message: err.response?.data?.message || err.message
  });
}

};
