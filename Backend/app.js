import express from 'express'
import cors from 'cors'
import route from '../Backend/route.js'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'





const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}
connectDB()




//server created
const app=express()
const port=process.env.PORT


//midlware
app.use(cors())
app.use(express.json())
app.use('/',route)






//last stm
app.listen(port,()=>console.log(`app is running on ${port}`))