import dotenv from "dotenv"
dotenv.config();
import app from "./src/app.js";
import cardDB from "./src/config/db.js";

const port = process.env.PORT || 8000;


const connectionString = async () =>{

    await cardDB()

    app.listen(port, ()=>{
        console.log(`cart server is running port ${port}`)
    })
}

connectionString();