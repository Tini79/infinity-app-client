import type { Metadata } from "next";
import { montserrat } from "@/app/ui/fonts";
import "@/app/ui/globals.css";
import NavigationProvider from "../context/navigation-provider";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  metadataBase: new URL("https://infinityprittyjewellery.com"),
  title: "Infinity Pritty Jewellery",
  description: "Founded in 2021, Infinity Pritty Jewellery Wear strives to introduce the world to the beauty of Balinese culture through our unique jewelry. We bridge the gap between traditional Balinese culture and modern fashion, allowing everyone to experience the “goodness of Bali“ through our vibrant and spiritually inspired designs.",
  keywords: ["Infinity Pritty Jewellery", "handmade jewelry", "balinese jewelry", "handcrafted jewelry", "balinese handcrafted jewelry", "balinese handmade jewelry", "bali jewelry"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${montserrat.className} antialiased`} >
        <NavigationProvider>{children}</NavigationProvider>
      </body>
    </html>
  );
}

