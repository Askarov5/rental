import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import FeaturedProperties from "@/components/FeaturedProperties";
import RecentProperties from "@/components/RecentProperties";

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
      <RecentProperties />
    </>
  );
};

export default HomePage;
