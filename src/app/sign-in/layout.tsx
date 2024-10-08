import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/theme";
import SnackbarContext from "@/utils/snackbarContext";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Animal Care",
  description: "Generated by Animal Care",
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
        <SnackbarContext>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SnackbarContext>
      </body>
    </html>
  );
}
