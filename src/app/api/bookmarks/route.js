import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import Property from "@/models/Properties";

export const dynamic = "force-dynamic";

// GET /api/bookmarks/
export const GET = async (request) => {
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

    // Check if the user already bookmarked the property
    const user = await User.findById(userId);

    // Get the bookmarked properties
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({message: "Something went wrong"}), { status: 500 });
  }
};

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

    let message;
    let isBookmarked = user.bookmarks.includes(propertyId);
    if (isBookmarked) {
      // If the property is already bookmarked, remove it
      user.bookmarks = user.bookmarks.pull(propertyId);
      message = "Property removed from bookmarks";
      isBookmarked = false;
    } else {
      // If the property is not bookmarked, add it
      user.bookmarks.push(propertyId);
      message = "Property added to bookmarks";
      isBookmarked = true;
    }

    await user.save();

    console.log(isBookmarked);

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
