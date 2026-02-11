import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import { paymentDB } from "./src/config/db.js";

const port = process.env.PORT || 8005;

const connectionString = async () => {
  await paymentDB();

  app.listen(port, () => {
    console.log(`payment services is running on ${port}`);
  });
};

connectionString();
