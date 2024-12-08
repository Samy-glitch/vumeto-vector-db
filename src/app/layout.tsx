import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { redirect } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const description =
  "Vumeto is an innovative anime streaming platform designed for enthusiasts seeking a premium, ad-free viewing experience. It features a custom-built player with advanced functionalities, including seamless subtitle management, quality selection, and playback controls. Vertex supports user accounts, allowing for personalized watchlists, anime tracking, and watch history preservation. The platform also provides detailed user statistics with visual graph views, a dynamic community comment system, and an engaging quest and reward system to enhance user interaction. With an extensive library of content and a focus on high-quality streaming, Vumeto redefines anime viewing for a modern audience.";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    default: "Vumeto",
    template: "%s • Vumeto",
  },
  description,
  openGraph: {
    title: "Vumeto",
    description,
    images: "https://vumeto.com/assets/images/Thumbnail.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vumeto",
    description,
    images: "https://vumeto.com/assets/images/Thumbnail.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  redirect("https://vumeto.com/");
}
