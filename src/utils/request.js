const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all Properties
async function fetchProperties( { showFeatured = false} = {}) {
  try {
    // if domain is not available yet
    if (!apiDomain) return [];

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties${showFeatured? '/featured': ''}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    if (!apiDomain) return [];
  }
}

// fetch single Property
async function fetchProperty(id) {
  try {
    // if domain is not available yet
    if (!apiDomain) return null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    if (!apiDomain) return [];
  }
}

export { fetchProperties, fetchProperty };
