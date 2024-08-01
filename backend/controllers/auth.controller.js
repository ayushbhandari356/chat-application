import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateTokens.js';

export const signup = async(req, res) => {
    console.log('user signup');
    try {

        const {fullname,username,password,confirmPassword,gender}=req.body  

        if(password!=confirmPassword){
            return res.status(400).json({error: 'Password do not matched'})
        }


        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // HASH THE PASSWORD
        const salt =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // AVATAIR https://avatar-placeholder.iran.liara.run/

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`        
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender==="male"?boyProfilePic:girlProfilePic

        })
       if(newUser){
        // GENERATE JWT TOKEN
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();
        res.status(201).json({ 
            // _id is in mongodb automatically
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilePic:newUser.profilePic
         });
       }
       else{
        res.status(400).json({error:"INvalid user data"})
       }

    } catch (error) {  
        console.log('Error in signup controller', error.message);
        
        res.status(500).json({error:'INTERNAL SERVER ERROR'})
    }
}
export const login = async(req, res) => {
    try {
        const {username, password} =req.body;
        const user=await User.findOne({username:username})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"")
        // In JavaScript, user?.password is using optional chaining (?.), a feature introduced in ES2020. It allows you to access properties of an object without the risk of throwing an error if the object is null or undefined.
        // So, user?.password will evaluate to user.password if user is not null or undefined. If user is null or undefined, it will short-circuit and return undefined instead of throwing an error.
        if (!user) {
            return res.status(400).json({ error: "INVALID USERNAME OR PASSWORD" });
        }

        

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "INVALID USERNAME OR PASSWORD" });
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,        
            profilePic:user.profilePic
        })
        console.log('login button clicked');
        

    } catch (error) {  
        console.log('Error in login controller', error.message);
        res.status(500).json({error:'INTERNAL SERVER ERROR'}) 
        
    }

}
export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxage:0})
        res.status(200).json({message:"logged out successfully"})
        console.log('user logout');
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({error:'INTERNAL SERVER ERROR'}) 
        
    }
}