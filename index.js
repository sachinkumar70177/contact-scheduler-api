const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const { contactRouter } = require("./route/user.contact.routes")
const app=express()
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send({msg:"you are welcome in the api of contact scheduler app"})
})
app.use("/contacts",contactRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("database is connected")
console.log("runnig on port of",process.env.PORT)
    } catch (error) {
        console.log(error)
    }
})