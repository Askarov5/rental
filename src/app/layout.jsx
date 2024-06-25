import './assets/styles/globals.css'

export const metadata = {
  title: "Zillow.KG | Properties for sales and rent",
  description: " Find your perfect property easily"
}

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}

export default MainLayout
