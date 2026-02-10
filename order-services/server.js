import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import orderDB from "./src/config/db.js";

const port = process.env.PORT || 8004;

const connectionString = async () => {

    await orderDB()
  app.listen(port, () => {
    console.log(`order servies is running on the ${port}`);
  });
};

connectionString();
