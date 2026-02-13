import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import { paymentDB } from "./src/config/db.js";
// imporing here the message broker
import { connect } from "./src/broker/broker.js";
const port = process.env.PORT || 8005;

const connectionString = async () => {
  await paymentDB();
   connect()
  app.listen(port, () => {
    console.log(`payment services is running on ${port}`);
  });
};

connectionString();
