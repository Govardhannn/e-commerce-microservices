import dotenv from "dotenv"
dotenv.config();
import app from "./src/app.js";

import sellerDashDb from "./src/config/db.js";
const port = process.env.PORT || 8008


const connectionString = async ()=>{
   await  sellerDashDb()

    app.listen(port, ()=>{
        console.log(`Seller-Dashboard is running on Port ${port}`)
    })



}
connectionString()
