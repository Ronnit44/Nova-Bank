import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "../../context/authContext";


export const metadata = {
  title: "Nova Bank",
  description: "All your Business Banking in One Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F6F6F6]">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
