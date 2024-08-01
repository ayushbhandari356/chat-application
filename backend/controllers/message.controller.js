import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js';
export const sendMessage = async (req, res) => {
  try {
    const {message} = req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id

    let conversation =await Conversation.findOne({
        participants: {$all:[senderId,receiverId]}
    })

    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId]
        })
    }
    const newMessage=new Message({
        senderId, 
        receiverId,
        message: message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
    res.status(201).json(newMessage);


// socket io here


    // await conversation.save();
    // await newMessage.save();
    // this will run in parallel means optimised code
    await Promise.all([conversation.save(), newMessage.save()])

  } catch (error) {
    console.log("Error in send message",error.message);
    res.status(500).json({error:"internal server error"});
  }
};

export const getMessage=async(req,res)=>{
    try {
      // id destructured and names as chattouserid
      const {id:userToChatId}=req.params
      const senderId=req.user._id

      const conversation=await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]}
      }).populate("messages")
      // not reference but actual messages is this 
      if(!conversation)return res.status(200).json([])

        const messages=conversation.messages

      res.status(200).json(messages)

    } catch (error) {
        console.log("Error in send message",error.message);
        res.status(500).json({error:"internal server error"});
    }
}