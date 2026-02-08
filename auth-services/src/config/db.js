import mongoose from "mongoose";

export const connDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "e-commerce-auth-service",
    });
    console.log(`Database connected sucessfully`);
  } catch (error) {
    console.log(`Databse connection fails`, error);
  }
};
