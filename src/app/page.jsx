import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";

export const metadata = {
  title: "Rental.KG | Properties for rent in Kyrgyzstan",
  description: "Find your perfect property to rent in Kyrgyzstan",
};

export const dynamic = "force-dynamic";

const HomePage = () => {

  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
