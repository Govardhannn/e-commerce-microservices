import dotenv from "dotenv"
dotenv.config();
import app from "./src/app.js";
const port = process.env.PORT || 8006


const connectionString = async () => {

    app.listen(port , ()=>{
        console.log(`superNova-ai is running ${port}`)
    })
}
connectionString();