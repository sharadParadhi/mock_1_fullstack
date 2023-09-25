const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/userModle")

const userRoutes = express.Router()

userRoutes.post("/signup", async (req, res) => {
    const { email, pass } = req.body;
    try {

        const userExist = await UserModel.findOne({ email })
        if (userExist) {
            res.status(400).json({ "msg": "user is already exist" })
        } else {
            bcrypt.hash(pass, 5, async (error, hash) => {
                if (error) {
                    res.status(400).send({ "msg": error })
                } else {
                    const newUser = new UserModel({ email, pass: hash })
                    await newUser.save()
                    res.status(201).json({ "msg": `${email} is registerd sucessfully` })
                }
            })
        }

    } catch (err) {
        res.status(400).json({ "msg": err })
    }
})

userRoutes.get("/", async (req, res) => {
    try {
        const allUsers=await UserModel.find()
        res.status(200).json({"users":allUsers})
    } catch (err) {
        res.status(400).json({ "error": "errro at sever" })
    }
})

userRoutes.post("/login",async(req,res)=>{

    const {email,pass}=req.body;
    try{
        const userExist=await UserModel.findOne({email})
        if(userExist){
            bcrypt.compare(pass,userExist.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:userExist._id},"masai");
                    res.status(201).json({"msg":`${userExist.email} logged successfully`,token})
                }else{
                    res.status(201).json({"msg":"Wrong password!"})
                }
            })
        }

    }catch(err){
        res.status(400).json({"error":`${err} in sever side`})
    }
}

)


module.exports = { userRoutes }