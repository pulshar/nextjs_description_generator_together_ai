import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Product Description Generator",
  description: "Generate a description for your product",
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
        {children}
        <footer className="mx-auto max-w-6xl mb-12 px-8 text-center lg:text-left text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://togetherai.link"
              target="_blank"
              className="underline underline-offset-2 transition hover:text-brand"
            >
              Together.ai
            </a>{" "}
            &{" "}
            <a
              href="https://togetherai.link"
              target="_blank"
              className="underline underline-offset-2 transition hover:text-brand"
            >
              Llama 3.2
            </a>
          </p>
         
        </footer>
      </body>
    </html>
  );
}
