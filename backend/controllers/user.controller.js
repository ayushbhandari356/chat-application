import User from "../models/user.model.js"

export const getUserForSiderbar=async(req,res)=>{
    try {
        const loggedInUserId = req.user._id  //user id comming from protectRouter

        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select('-password')

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("error in getUserForSiderbar",error.message)
        res.status(500).json({error:"internal server error in user.controller.js"}) 
    }
} 