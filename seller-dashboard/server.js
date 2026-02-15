import dotenv from "dotenv"
dotenv.config();
import app from "./src/app.js";

import sellerDashDb from "./src/config/db.js";
import { connect } from "./src/broker/broker.js";
import listner from "./src/broker/listner.js";
const port = process.env.PORT || 8008


const connectionString = async () => {
  await sellerDashDb();   // 👈 wait for DB connection
   
  connect().then(()=>{   //
    listner()
   })

  app.listen(port, () => {
    console.log(`Seller-Dashboard is running on Port ${port}`);
  });
};

connectionString();
