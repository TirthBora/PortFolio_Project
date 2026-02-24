import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cyber Defense Portfolio | Information Security",
  description:
    "Premium cybersecurity portfolio — Information Security, Ethical Hacking, and Cyber Defense. Securing the digital future.",
  keywords: [
    "cybersecurity",
    "information security",
    "ethical hacking",
    "cyber defense",
    "portfolio",
  ],
  openGraph: {
    title: "Cyber Defense Portfolio",
    description: "Securing the digital future.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
        style={{ background: "#050505" }}
      >
        {children}
      </body>
    </html>
  );
}
