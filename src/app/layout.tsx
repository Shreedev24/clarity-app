import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

// Configure the fonts
const plex_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-plex-sans", // CSS variable name
});

const plex_serif = IBM_Plex_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-plex-serif", // CSS variable name
});

export const metadata: Metadata = {
  title: "Clarity",
  description: "Your calm, clear path to getting things done.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply the font variables to the body */}
      <body className={`${plex_sans.variable} ${plex_serif.variable}`}>
        {children}
      </body>
    </html>
  );
}