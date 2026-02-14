const jwt = require("jsonwebtoken");
const User = require("../Mongo/Usermongo");

const generatedtoken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"});
}


const Userregister=async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(404).json({message:"User already exists"});
    }
    
    const newUser = await User.create({email,password});
    const token = generatedtoken(newUser._id);
    res.json({
        token,
        user:{
            id:newUser._id,
            email:newUser.email
        }
    })
}



module.exports = Userregister;