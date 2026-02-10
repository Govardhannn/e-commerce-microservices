import mongoose from "mongoose";



const orderDB = async () =>{

   try {
     await mongoose.connect(process.env.MONGO_URI, {
       dbName: "e-commerce-order-service",
     });
     console.log(`Database connected sucessfully`);
   } catch (error) {
     console.log(`Databse connection fails`, error);
   }
}

export default orderDB;