"use client";
import { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "@/app/loading";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

const PropertyMap = ({ property }) => {
  const { street, city, state, zipcode } = property.location;
  
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  // This sets default values for language and region for geocoding requests.
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const address = `${street}, ${city}, ${state}, ${zipcode}`;
        const response = await fromAddress(address);

        if( response.results.length === 0) {
            setGeocodeError(true);
            setLoading(false);
            return;
        }
        const { lat, lng } = response.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.error(error);
        setGeocodeError(true)
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [street, city, state, zipcode]);

  if (loading) return <Spinner loading={loading} />;

  if(geocodeError) {
    return <p className="text-red-500">No location data found on the map</p>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 12,
        }}
        className="w-full h-[300px] md:w-[400px]"
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker latitude={lat} longitude={lng}>
          <span className="text-red-500">📍</span>
        </Marker>
        <Marker latitude={lat} longitude={lng}>
          <Image src={pin} alt="location pin" width={30} height={30} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
