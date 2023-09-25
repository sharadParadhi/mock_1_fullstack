const mongoose=require("mongoose")


const empSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    salary:String
},
{
    versionKey:false
})

const EmpModel=mongoose.model("employees",empSchema)

module.exports={EmpModel}