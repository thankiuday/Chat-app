import Conversation from "../models/conversation.model.js";
import Message from '../models/message.model.js'
import { getReceiverSocketId,io } from "../Socket/socket.js";
export const sendMessage = async (req, res) => {
    try {
        // getting the message from url
        const message = req.body.message;
        // getting the user  id from the url
        const { id: receivedId } = req.params;
        // getting the senderId via middleware
        const senderId = await req.user._id;


        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receivedId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receivedId],

            })
        }
        const newMessage = new Message({
            senderId,
            receivedId,
            message
        })
        if (newMessage) {
            conversation.message.push(newMessage._id)
        }

       
        // await conversation.save()
        // await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage)
         // socket io functionalty
         const ReceiverSocketId  = getReceiverSocketId(receivedId)
         if(ReceiverSocketId)
         {
             io.to(ReceiverSocketId).emit('newMessage', newMessage)
         }
    } catch (error) {
        console.log("error in message controller", error.message)
        res.status(500).json({ error: "internal server error" })
    }

}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate("message")
        if(!conversation) return res.status(200).json([])
        res.status(200).json(conversation.message)
    } catch (e) {
        console.log("error in getMessage controller ", e.message)
        res.status(500).json({ error: "internal server error" })
    }
}


