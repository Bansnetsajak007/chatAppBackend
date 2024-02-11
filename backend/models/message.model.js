import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    // messages schema here
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    message: {
      type: String,
      required: true,  
    },
}, {timestamps: true}  //allows easiness to look when message was created
);

const Message = mongoose.model("Message",messageSchema);

export default Message;