import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 4003;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Cart service running on port ${PORT}`);
  });
};

startServer();
