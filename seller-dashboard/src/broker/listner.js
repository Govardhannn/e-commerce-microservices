import { subscribeToQueue } from "./broker.js";
import userModel from "../models/user.model.js";


export default function () {
    //
  subscribeToQueue("AUTH_SELLER_DASHBOARD.USER_CREATED", async (user) => {
    console.log("📥 Received user:", user);
    await userModel.create(user);
  });

// 

}
