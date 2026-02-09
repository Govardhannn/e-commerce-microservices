import app from "./src/app.js";
import { productDB } from "./src/config/db.js";

const port = process.env.PORT || 8000;

const connctionSting = async () =>{

 await productDB()
    app.listen(port, ()=>{
        console.log(`product server is running ${port}`)
    })
}


connctionSting()