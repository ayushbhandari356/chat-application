import mongoose from "mongoose";
import User from "./user.model.js";
import Message from "./message.model.js";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    messages: [
        { type: mongoose.Schema.Types.ObjectId,
           ref: Message ,
           default:[]
            
        }
    ],
  },
  { timestamps: true }
);
// mongoose apne app ek user _id bana dega


// mongoose Conversations collection bana dega khud mongodb me under mongoose.model 
const Conversation=mongoose.model('Conversation',conversationSchema)
export default Conversation