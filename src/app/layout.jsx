import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import Footer from "@/components/Footer";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";

const MainLayout = async ({ children }) => {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang={locale}>
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
            />
          </head>
          <body>
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ToastContainer />
            </NextIntlClientProvider>
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
