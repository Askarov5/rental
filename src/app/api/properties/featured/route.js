import connectDB from "@/config/database";
import Property from "@/models/Properties";

export const dynamic = "force-dynamic";

// GET  /api/properties/featured
export const GET = async (request) => {
  try {
    // connect to the database
    await connectDB();

    // get page and pageSize from search params
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const pageSize = url.searchParams.get("pageSize") || 2;

    const skip = (page - 1) * pageSize; // calculate the number of documents to skip
    const total = await Property.countDocuments({ is_featured: true }); // get the total number of properties

    const properties = await Property.find({ is_featured: true })
      .skip(skip)
      .limit(pageSize);

      const result = {
        properties,
        total,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      }
  
      return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
