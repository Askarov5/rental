import connectDB from "@/config/database";
import Property from "@/models/Properties";

// GET /api/properties/user/[userId]
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    
    const { userId } = params;
    if(!userId) {
      return new Response(
        JSON.stringify({ message: "Unauthorized: User Id is required" }),
        { status: 401 }
      );
    }

    const properties = await Property.find({owner: userId});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong: ${error}`, { status: 500 });
  }
};