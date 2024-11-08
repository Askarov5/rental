import connectDB from "@/config/database";
import Property from "@/models/Properties";
import { getSessionUser } from "@/utils/getSessionUser";

// Get /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
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

    const {id}= params;
    const { userId } = sessionUser;

    // Parse the incoming request
    const formData = await request.formData();

    // Access all values from the amenities and images
    const amenities = formData.getAll("amenities");

    // Get Property to update
    const existingProperty = await Property.findById(id);
    
    if(!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }

    // Check if the user is the owner of the property
    if(existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

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
      square_meter: formData.get("square_meter"),
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

    // Update the property with the new data
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)

    // Redirect to the new property page
    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed add a property" }, { status: 500 })
    );
  }
};


// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId =  params.id;
    
    await connectDB();

    const property = await Property.findById(propertyId);

    // First Check if the user is owner of the property
    const user = await getSessionUser(request);
    if (!user || !user.userId) {
      return new Response("Unauthorized: User Id is required", { status: 401 });
    }

    const { userId} = user;
    if(property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Delet the property
    await property.deleteOne();

    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify({message: 'Property successfully removed'}), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong:" + error, { status: 500 });
  }
};