import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
 import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res) => {
    try {
        const senderId = req.body.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        console.log("sender id:",senderId,"receiver id:",receiverId,"message",message);

        let gotConversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]},
        });

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        

        await Promise.all([gotConversation.save(), newMessage.save()]);
         
        // SOCKET IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}


export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id; // Get receiverId from URL parameter
        const senderId = req.body.id; // Get senderId from request body

        console.log("printing receiver and sender id",receiverId,senderId)

        // Find conversation where both senderId and receiverId are participants
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log("Error fetching conversation messages:", error);
        return res.status(500).json({ error: "An error occurred while fetching messages." });
    }
}