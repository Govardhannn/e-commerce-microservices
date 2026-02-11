import dotenv from "dotenv"
import connectDB from "./src/db/db.js";
import app from "./src/app.js";
dotenv.config();


const port = process.env.PORT || 8004;

connectDB();


const connectionString = async () =>{
 await connectDB()

    app.listen(port, () => {
    console.log(`Order service is running on port ${port}`);
})
}

connectionString();
