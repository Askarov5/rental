const { default: connectDB } = require("@/config/database");
const { default: Property } = require("@/models/Properties");

// GET /api/properties/search-results
export const GET = async (req) => {
  try {
    // get search params from url query
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location") || "";
    const propertyType = searchParams.get("propertyType") || "All";
    const bedrooms = searchParams.get("bedrooms") || "Any";
    const bathrooms = searchParams.get("bathrooms") || "Any";

    // get properties based on the search criteria from the database
    await connectDB();

    // Match location, description, street, city, state, or zip against database fields
    const locationPattern = new RegExp(location, "i");
    const query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for property type if it's not "All"
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    // Only check for bedrooms if it's not "Any"
    if (bedrooms !== "Any") {
      const bedroomsInt = parseInt(bedrooms);
      if (bedroomsInt < 4) query.beds = bedroomsInt;
      else query.beds = { $gte: bedroomsInt };
    }

    // Only check for bathrooms if it's not "Any"
    if (bathrooms !== "Any") {
      const bathroomsInt = parseInt(bathrooms);
      if (bathroomsInt < 4) query.baths = bathroomsInt;
      else query.baths = { $gte: bathroomsInt };
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
};
