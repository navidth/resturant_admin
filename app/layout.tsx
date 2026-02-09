import "antd/dist/reset.css";
import type { Metadata } from "next";
import "../src/style/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const geistSans = Geist({
      variable: "--font-geist-sans",
      subsets: ["latin"],
});
const geistMono = Geist_Mono({
      variable: "--font-geist-mono",
      subsets: ["latin"],
});

export const metadata: Metadata = {
      title: "Resturant Panel"
};

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html dir="ltr" lang="en">
                  <body className={` ${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F5F5]  overflow-x-hidden `}>
                        <AntdRegistry>{children}</AntdRegistry>
                  </body>
            </html>
      );
}


