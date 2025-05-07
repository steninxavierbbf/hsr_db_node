import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes/userRoutes.js'
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors());
const port = process.env.PORT || 4000;
const mongoose_url = process.env.MONGO_URL;

mongoose.connect(mongoose_url).then(()=>{
    app.listen(port,()=>{
        console.log("app running successfully at",port)
    })
}).catch((error)=> console.log(error));

app.use("/api",route);