import Link from "next/link"
import PropertiesPage from "./properties/page"
import Hero from "@/components/Hero"
import InfoBoxes from "@/components/InfoBoxes"
import HomeProperties from "@/components/HomeProperties"


export const metadata = {
    title: "Zillow.KG | Properties for sales and rent",
    description: " Find your perfect property easily"
  }

const HomePage = async () => {

  return (
    <>
        <Hero />
        <InfoBoxes />
        <HomeProperties />
    </>
  )
}

export default HomePage