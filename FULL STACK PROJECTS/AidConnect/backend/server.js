const express=require('express');
const cors=require('cors');
const connectToDb=require('./config/mongoose')
const  connectCloudinary  = require('./config/cloudinary');

const dotenv=require('dotenv');
const adminRouter = require('./routes/adminRoute');
dotenv.config()

const app=express();
const port=process.env.PORT;

connectToDb();
connectCloudinary();

// Middlewares
app.use(express.json());

app.use(cors());

// Api endpoints

app.use('/api/admin',adminRouter)
app.get('/',(req,res)=>res.json("Hello Server"))


app.listen(port,()=>{console.log(`Listening on port ${port}`);});