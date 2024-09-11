import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    receivedId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    message: {
        type: String,
        required:true,
    }
},{timestamps:true}
);

const message = mongoose.model("message",messageSchema);
export default message;