import express from 'express'
import { Email } from './Controller/Email.js'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv'

dotenv.config()

app.use(cors({
    origin:true,
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/', Email)


app.listen( process.env.PORT, ()=> console.log(`server is running on ${process.env.PORT}`))
