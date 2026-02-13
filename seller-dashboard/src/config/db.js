import mongoose from "mongoose"


const sellerDashDb = async () =>{
   try {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "e-commerce-Seller-Dashboard-service"
    })
    console.log("cart database id connected")
   } catch (error) {
  console.log("database connection failed")   
   }
}

export default sellerDashDb;