import Header from "@/components/Header";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Find Dog App",
  description: "Application to find dogs' images",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-white">
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Navbar />
      </body>
    </html>
  );
}
