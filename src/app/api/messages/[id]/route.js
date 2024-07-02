import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

// PUT /api/messages/:id
export const PUT = async (req, { params }) => {
    try {
        await connectDB();

        const { id } = params;

        // check if user is logged in
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({message: "Unauthorized: You must be logged in to update a message"}), { status: 401 });
        }
        const { userId } = sessionUser;

        // check if message exists
        const message = await Message.findById(id);
        if(!message) {
            return new Response(JSON.stringify({message: "Message not found"}), { status: 404 });
        }

        // check if user is the recipient of the message
        if(message.recipient.toString() !== userId) {
            return new Response(JSON.stringify({message: "Unauthorized: You must be the recipient of the message to update it"}), { status: 401 });
        }

        // Update the message as read/unread based on the current status
        message.read = !message.read

        await message.save();

        return new Response(JSON.stringify(message), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({message: "Unable to update message: " + error.message}), { status: 500 });
    }

}


// DELETE /api/messages/:id
export const DELETE = async (req, { params }) => {
    try {
        await connectDB();

        const { id } = params;

        // check if user is logged in
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({message: "Unauthorized: You must be logged in to delete a message"}), { status: 401 });
        }
        const { userId } = sessionUser;

        // check if message exists
        const message = await Message.findById(id);
        if(!message) {
            return new Response(JSON.stringify({message: "Message not found"}), { status: 404 });
        }

        // check if user is the recipient of the message
        if(message.recipient.toString() !== userId) {
            return new Response(JSON.stringify({message: "Unauthorized: You must be the recipient of the message to delete it"}), { status: 401 });
        }

        await message.deleteOne();

        return new Response(JSON.stringify({message: "Message deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({message: "Unable to delete message: " + error.message}), { status: 500 });
    }
}