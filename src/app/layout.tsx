import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sujal Chaudhary - NSUT",
  description: "Portfolio of Sujal Chaudhary, a Full Stack Web Developer with expertise in HTML, CSS, JavaScript, React, PHP, Nextjs and more. From NSUT. Explore my projects and get in touch.",
  keywords: "Sujal Chaudhary, NSUT, Full Stack Developer, Web Developer, Next.js, React, PHP, HTML, CSS, JavaScript, MERN Stack, Developer, Portfolio, Projects, Contact",
  icons:{
    icon:"https://sdrive.blr1.cdn.digitaloceanspaces.com/files/4cfb797bd42593aaf2b981960f6966d3.gif"
  },
  openGraph:{
    title:"Sujal Chaudhary - NSUT",
    description:"Portfolio of Sujal Chaudhary, a Full Stack Web Developer with expertise in HTML, CSS, JavaScript, React, PHP, Nextjs and more. From NSUT. Explore my projects and get in touch.",
    url:"https://sujal.info",
    type:"website",
    images:[
      {
        url:"https://sdrive.blr1.cdn.digitaloceanspaces.com/files/100a7d9705614a6a607a0fc19b76628e.png",
        width:1130,
        height:566,
        alt:"Sujal Chaudhary - NSUT"
      }
    ]
  },
  twitter:{
    card:"summary_large_image",
    title:"Sujal Chaudhary - NSUT",
    description:"Portfolio of Sujal Chaudhary, a Full Stack Web Developer with expertise in HTML, CSS, JavaScript, React, PHP, Nextjs and more. From NSUT. Explore my projects and get in touch.",
    images:[
      {
        url:"https://sdrive.blr1.cdn.digitaloceanspaces.com/files/100a7d9705614a6a607a0fc19b76628e.png",
        width:1130,
        height:566,
        alt:"Sujal Chaudhary - NSUT"
      }
    ]
  },
  robots:"index,follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainNavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
