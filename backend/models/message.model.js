import mongoose from 'mongoose';
import User from './user.model.js';

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    message:{
        type:String,
        required:true
    }
    // created at updatedat
},{timestamps:true});

// Message collection created as Messages by Mongoose itself under model
const Message=mongoose.model('Message',messageSchema);
export default Message;



// mongoose apne app ek user _id bana dega