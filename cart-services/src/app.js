import express from "express"
import router from "./routes/cart.route.js";
import cookieParser from 'cookie-parser'
const app = express();

app.use(express.json())
app.use(cookieParser())


app.use('/cart/product', router)

export default app;