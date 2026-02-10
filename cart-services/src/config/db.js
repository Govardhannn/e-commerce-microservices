import mongoose from "mongoose"


const cardDB = async () =>{
   try {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "e-commerce-cart-service"
    })
    console.log("cart database id connected")
   } catch (error) {
  console.log("database connection failed")   
   }
}

export default cardDB;