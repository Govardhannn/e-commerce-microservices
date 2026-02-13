import express from 'express'
// import { subscribeToQueue } from './MBroker/broker.js'




const app = express()

app.get('/', function (req, res){
    res.send("notification servies is up ")
})




// subscribeToQueue('AUTH_NOTIFICATION.USER_CREATED', async (data)=>{
//     console.log(
//         'Reseved the data from the Queue' , data
//     )
// })


export default app;