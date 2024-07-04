import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";

export const metadata = {
  title: "Zillow.KG | Properties for sales and rent",
  description: " Find your perfect property easily",
};

export const dynamic = "force-dynamic";

const HomePage = async () => {
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
