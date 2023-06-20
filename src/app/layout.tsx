import Header from "@/components/Header";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        {children}
        <Navbar />
      </body>
    </html>
  );
}
