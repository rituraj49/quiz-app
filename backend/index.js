import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDb.js';
import questionRouter from './routes/questionRouter.js'

// env condig
dotenv.config()

// express implementation
const app = express();
const PORT = process.env.PORT

// db connection
connectDb();

app.use(express.json());

app.use("/api/", questionRouter)

app.get("/", (req, res)=>{
    res.send(`server running at port ${PORT}`)
})

app.listen(PORT,()=>{
    console.log("server logging ",PORT);
})