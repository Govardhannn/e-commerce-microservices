import app from "./src/app.js";
import { connDB } from "./src/config/db.js";

const port = process.env.PORT || 3000;


const connectionInstance = async () =>{

    await connDB();
    app.listen(port , ()=>{
        console.log(`server is running on port ${port}`)
    })
}


connectionInstance();