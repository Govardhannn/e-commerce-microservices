import dotenv from "dotenv"
dotenv.config();
import app from "./src/app.js";
const port = process.env.PORT || 8006

import http from "http"
import { initSocketServer } from "./src/sockets/socket.server.js";
const httpServer = http.createServer(app)




const connectionString = async () => {

    await initSocketServer(httpServer)
    httpServer.listen(port , ()=>{
        console.log(`superNova-ai is running ${port}`)
    })
}
connectionString();