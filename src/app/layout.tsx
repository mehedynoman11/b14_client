import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza Point",
  description: "Developed By Noman",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}

        <Toaster
          position="bottom-right"
          toasterId="default"
          toastOptions={{
            className: '',
            duration: 3000,
            removeDelay: 1000,
          }}
        />
      </body>
    </html>
  );
}
