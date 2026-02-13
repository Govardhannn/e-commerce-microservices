import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";

import { connect } from "./src/MBroker/broker.js";
 
// importing form the listner.js
import appLister from "./src/MBroker/listner.js"

const port = process.env.PORT || 8007;





const connectionString = async () => {
  await connect();

 appLister()
  app.listen(port, () => {
    console.log(`Notification service is running on port${port}`);
  });
};

connectionString();
