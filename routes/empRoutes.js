const express=require("express");
const {EmpModel}=require("../models/empModel")


const empRoutes=express.Router();

empRoutes.post("/add",async(req,res)=>{
    const {email,firstName,lastName}=req.body
    try{
        const existEmp=await EmpModel.findOne({email})
        if(existEmp){
            res.status(400).json({"msg":`${email} is already exist`})
        }else{
            let newEmp=new EmpModel({...req.body})
            await newEmp.save()
            res.status(201).json({"msg":` new Emplyee ${firstName} ${lastName} is adeed`})
        }
        //res.send("addd")

    }catch(err){
        res.status(400).json({"err":err})
    }
})

empRoutes.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params;
    try{
        console.log(postID,req.body)
        const updatUser=await EmpModel.findByIdAndUpdate({_id:postID},req.body)
        console.log(updatUser,"updateuser")
        if(updatUser){
            res.status(201).json({"msg":`${postID} is updated sucessfully`})
           
        }else{
            res.status(400).json({"msg":"user not fond"})
        }
    }catch(err){
        res.status(400).json({"errror":err.message})
    }
})

empRoutes.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params;
    try{
        const updatUser=await EmpModel.findByIdAndDelete({_id:postID})
        if(updatUser){
            res.status(201).json({"msg":`${postID} is delted sucessfully`})
        }else{
            res.status(400).json({"msg":"user not fond"})
           
        }
    }catch(err){
        res.status(400).json({"errror":err.message})
    }
})

empRoutes.get("/",async(req,res)=>{
    const {page}=req.query;
    const limit=5
    console.log(page)
    
    console.log(page,limit)
    
    try{
        const skip=(page-1)*limit
        const empls=await EmpModel.find().skip(skip).limit(limit)
        if(empls){
            res.status(200).json({"data":empls})
        }else{
            res.status(200).json({"msg":`no employees is found`})
        }
    }catch(err){
        res.status(400).json({"errror":err.message})
    }
})

module.exports={empRoutes}