import path from "path"

import express from 'express';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js" 

import connectToMongoDB from './db/connectToMongodb.js';

import { app ,server} from './socket/socket.js';

dotenv.config()
const PORT=process.env.PORT || 5000

const __dirname=path.resolve()

// this is middleware and router
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

app.use(express.static(path.join(__dirname,"frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})
// const deepak=()=>{
//     console.log("deepak")
// }
// app.post('/api/messagess',deepak)

// app.get('/', (req,res)=>{
//     // root route http://localhost:5000/
//     res.send("hello world!")
// })



// to deploy in vercel
// app.use(cors({
//     origin:["https://deploy-mern.vercel.app"],
//     method:['POST',"GET"],
//     credentials:true
// }))




server.listen(PORT,()=>{
    connectToMongoDB()
    console.log('listening on port ',PORT)
})