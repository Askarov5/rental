import connectDB from "@/config/database";
import Property from "@/models/Properties";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (request) => {
  try {
    // connect to the database
    await connectDB();
    // get page and pageSize from search params
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const pageSize = url.searchParams.get("pageSize") || 6;

    const skip = (page - 1) * pageSize; // calculate the number of documents to skip
    const total = await Property.countDocuments(); // get the total number of properties

    
    const properties = await Property.find({}).skip(skip).limit(pageSize);

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

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

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
    const formData = await request.formData();

    // Access all values from the amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // Create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        phone: formData.get("seller_info.phone"),
        email: formData.get("seller_info.email"),
      },
      owner: userId,
    };

    // Upload image(s) to Cloudinary
    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString("base64");
      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageBase64}`,
        {
          folder: "zillow",
        }
      );

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      propertyData.images = uploadedImages;
    }

    // Save the property to the database
    const newProperty = new Property(propertyData);
    await newProperty.save();

    // Redirect to the new property page
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed add a property" }, { status: 500 })
    );
  }
};
