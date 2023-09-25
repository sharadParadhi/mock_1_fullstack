
const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1] || null
    try{
        const decoded=jwt.verify(token,"masai")
        next()

    }catch(err){
        res.status(400).json({"msg":err.message})
    }

}

module.exports={auth}