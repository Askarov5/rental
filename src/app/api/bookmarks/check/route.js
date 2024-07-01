
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import Property from "@/models/Properties";

export const dynamic = 'force-dynamic';

// POST /api/bookmarks
export const POST = async (request) => {
  try {
    await connectDB();

    // get the user id from the session
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify(
          { message: "Unauthorized: User Id is required" },
          { status: 401 }
        )
      );
    }

    const { userId } = sessionUser;

    // Parse the incoming request
    const { propertyId } = await request.json();

    // Check if the property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    // Check if the user already bookmarked the property
    const user = await User.findById(userId);

    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(
      JSON.stringify({ isBookmarked }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};