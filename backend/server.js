import express from 'express';
import  cors from 'cors';
import "dotenv/config";
import { clerkMiddleware,requireAuth } from '@clerk/express'
import aiRouter from './routes/airoutes.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userroutes.js';
const app= express();
await connectCloudinary()
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(requireAuth())

app.use("/api/ai",aiRouter)
app.use("/api/user",userRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});