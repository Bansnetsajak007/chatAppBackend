import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"


export const sendMessage = async (req , res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // will add socket functionality to communicate in real time

       //runs in paralel
       await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json(newMessage);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({error: "Internal Server Error"});
    }
}

export const getMessage = async (req, res) => { 
    try {
        //get message logic
        const {id:userTochatId} = req.params;
        const senderId = req.user._id;

        //trying to connect one collection with another
        const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userTochatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if(!conversation) return res.status(200).json([]);
        
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error: "Internal Server Error"});
    }
}
