import express from 'express';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from './db/connectToMongodb.js';

const app= express()

dotenv.config()
const PORT=process.env.PORT || 5000

// this is middleware and router
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)


// const deepak=()=>{
//     console.log("deepak")
// }
// app.post('/api/messagess',deepak)

// app.get('/', (req,res)=>{
//     // root route http://localhost:5000/
//     res.send("hello world!")
// })




app.listen(PORT,()=>{
    connectToMongoDB()
    console.log('listening on port ',PORT)
})