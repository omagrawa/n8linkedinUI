import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import { LinkedinProvider } from "./contexts/LinkedinContext";
import { ChannelsProvider } from "./contexts/ChannelsContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ripple AI Test",
  description: "Simple admin dashboard with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LinkedinProvider>
            <ChannelsProvider>
              {children}
            </ChannelsProvider>
          </LinkedinProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
