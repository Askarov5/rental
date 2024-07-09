const { default: connectDB } = require("@/config/database");
const { default: Property } = require("@/models/Properties");

export const dynamic = "force-dynamic";

// GET /api/properties/search-results
export const GET = async (req) => {
  try {
    // get search params from url query
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location") || "";
    const propertyType = searchParams.get("propertyType") || "Any";
    const bedrooms = searchParams.get("bedrooms") || "Any";
    const bathrooms = searchParams.get("bathrooms") || "Any";
    const rateMax = searchParams.get("rateMax") || "9999999";
    const rateType = searchParams.get("rateType") || "Any";
    // pagination params
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || 1;
    const pageSize = url.searchParams.get("pageSize") || 6;

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
    if (propertyType && propertyType !== "Any") {
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

    // Check rate max and rate type
    if (rateMax !== "Any" && rateType !== "Any") {
      if (rateType === "Nightly") {
        query["rates.nightly"] = { $lte: parseInt(rateMax), $gt: 0 };
      } else if (rateType === "Monthly") {
        query["rates.monthly"] = { $lte: parseInt(rateMax), $gt: 0 };
      }
    } else if (rateMax !== "Any" && rateType === "Any") {
      query["$or"] = [
        { "rates.nightly": { $lte: parseInt(rateMax), $gt: 0 } },
        { "rates.monthly": { $lte: parseInt(rateMax), $gt: 0 } },
      ];
    } else if (rateMax === "Any" && rateType !== "Any") {
      if (rateType === "Nightly") {
        query["rates.nightly"] = { $gt: 0 };
      } else if (rateType === "Monthly") {
        query["rates.monthly"] = { $gt: 0 };
      }
    }

    // get total number of properties based on the search criteria and calculate pagination
    const skip = (page - 1) * pageSize; // calculate the number of documents to skip
    const total = await Property.countDocuments(query); // get the total number of properties

    // get properties based on the search criteria
    const properties = await Property.find(query).skip(skip).limit(pageSize);

    const result = {
      properties,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
};
