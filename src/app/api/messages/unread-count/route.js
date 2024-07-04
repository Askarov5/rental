import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages/unread-count
export const GET = async (req) => {
    try {
        await connectDB();

        // check if user is logged in
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({message: "Unauthorized: You must be logged in to update a message"}), { status: 401 });
        }
        const { userId } = sessionUser;

        const countUnreadMessages = await Message.countDocuments({recipient: userId, read: false});

        return new Response(JSON.stringify({count: countUnreadMessages}), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({message: "Unable to update message: " + error.message}), { status: 500 });
    }

}