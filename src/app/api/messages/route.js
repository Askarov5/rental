import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

// GET /api/messages
export const GET = async (req) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({message: "Unauthorized: You must be logged in to view messages"}), { status: 401 });
        }
        const { userId } = sessionUser;

        const readMessages = await Message.find({recipient: userId, read: true})
        .sort({createdAt: -1})
        .populate("sender", "name")
        .populate("property", "name");

        const unreadMessages = await Message.find({recipient: userId, read: false})
        .sort({createdAt: -1})
        .populate("sender", "name")
        .populate("property", "name");

        const messages = [...unreadMessages, ...readMessages]

        return new Response(JSON.stringify(messages), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({message: "Unable to fetch messages: " + error.message}), { status: 500 });
    }
}

// POST /api/messages
export const POST = async (req) => {
    try {
        await connectDB();

        const { name, email, phone, message, property, recipient } = await req.json();

        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({message: "Unauthorized: You must be logged in to send a message"}), { status: 401 });
        }
        const { userId } = sessionUser;

        // Can not send message to self
        if(userId === recipient) {
            console.error("Can not send message to self");
            return new Response(JSON.stringify({message:"Can not send message to self"}), { status: 400 });
        }

        const newMessage = new Message({
            sender: userId,
            recipient,
            property,
            name,
            email,
            phone,
            body: message
        });

        await newMessage.save();
        
        return new Response(JSON.stringify({message: "Message sent successfully"}), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({message: "Unable to send message: " + error.message}), { status: 500 });
    }
}