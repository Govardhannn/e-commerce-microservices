import express from "express"

const app = express()

app.get('/api', function(req, res){
    res.send('socket is working ')
})






export default app;