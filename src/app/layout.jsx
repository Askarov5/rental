import Footer from "@/components/Footer";
import "../assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/providers/AuthProvider";

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <head></head>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
