import express from 'express'




const app = express()

app.get('/', function (req, res){
    res.send("notification servies is up ")
})







export default app;