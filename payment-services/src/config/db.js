import mongoose from "mongoose";

export const paymentDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "e-commerce-Payment-service",
    });
    console.log(`Database connected sucessfully`);
  } catch (error) {
    console.log(`Databse connection fails`, error);
  }
};
