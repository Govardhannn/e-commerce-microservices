import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";

import { connect } from "./src/MBroker/broker.js";
 


const port = process.env.PORT || 8007;





const connectionString = async () => {
  await connect();


  app.listen(port, () => {
    console.log(`Notification service is running on port${port}`);
  });
};

connectionString();
