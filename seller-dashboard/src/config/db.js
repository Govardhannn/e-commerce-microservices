import mongoose from "mongoose"

const sellerDashDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "e-commerce-Seller-Dashboard-service"
    });

    console.log("Seller Dashboard DB connected successfully" ,process.env.MONGO_URI );
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default sellerDashDb;
