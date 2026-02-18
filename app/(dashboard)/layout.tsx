import Navbar from "@/src/components/Navbar";
import { Layout } from "antd";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Navbar />
      {children}
    </Layout>
  );
}
