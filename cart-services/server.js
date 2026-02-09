import dotenv from "dotenv"
dotenv.config();
import app from "./src/app.js";

const port = process.env.PORT || 8000;


const connectionString = async () =>{


    app.listen(port, ()=>{
        console.log(`cart server is running port ${port}`)
    })
}

connectionString();