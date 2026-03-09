import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navigation from "./ui/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TBHC - Phonebook",
  description: "Phonebook for the company that provides a directory of all employees and their contact information. It enables quick access to phone and email details and includes department-based filtering for easier navigation.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "The Brooklynn Hospital Center - Phonebook",
    description: "Phonebook for The Brooklynn Hospital Center",
    url: "https://brooklynn-hospital-center.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-[#F2EAE3] to-[#F2EAE4]`}
      > */}

      {/* bg-[#F2EAE3] */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-[#F2EAE3] to-[#F2EAE4]`}
      >
        {/* {children} */}
        <div 
          className="p-4 gap-4 flex flex-col max-w-screen-2xl mx-auto"
          style={{minHeight: '100vh', height: 'auto'}}
          >
        {/* <div className={"p-4"}> */}
          <Navigation 
            className={
              // "3xl:max-w-screen-2xl mx-auto" +
              "bg-[#F7F3EE] rounded-lg shadow-lg"
            }

            logo={
                { src: "/tbhc-icon-logo.png", href: "/", alt: "TBHC Logo", width: 300, height: 300 }
              }
              logoMobile={
                { src: "/tbhc-icon-logo.png", href: "/", alt: "TBHC Logo", width: 300, height: 300 }
              }
            menuItems={[
              { href: "/", name: "Main" },
              { href: "/departments", name: "Departments" }
            ]} 
          />
          {children}
        </div>
      </body>
    </html>
  );
}
