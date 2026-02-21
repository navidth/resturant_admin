import "antd/dist/reset.css";
import type { Metadata } from "next";
import "../src/style/globals.css";
import { Roboto } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Resturant Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="ltr" lang="en">
      <body
        className={`${roboto.variable} ${roboto.className} antialiased bg-[#F5F5F5] overflow-x-hidden`}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
