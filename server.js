const express=require("express")
const {connection}=require("./config/db")
const {userRoutes}=require("./routes/userRoute")
const {empRoutes}=require("./routes/empRoutes")
const {auth}=require("./middlewares/auth")
const cors=require("cors");



const app=express();
app.use(express.json())
app.use(cors())

app.use("/users",userRoutes)
app.use("/employees",auth,empRoutes)

app.get("/",async(req,res)=>{
    try{
        res.send("working api")
}catch(err){
    res.send({err:err})
}
})
    

app.listen(8000,async()=>{
    try{

        await connection;
        console.log("db is connect at ",8000)
    }catch(err){
        console.log(err)
    }
   
})