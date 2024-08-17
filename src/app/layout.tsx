import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import ReactQueryProviders from "@/providers/ReactQueryProviders";
import { ThemeProviders } from "@/providers/ThemeProviders";
import { NavBar } from "@/components/NavBar/NavBart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FotCamp Tech Blog",
  description: "FotCamp Tech Blog"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReactQueryProviders>
          <ThemeProviders
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Theme>
              <NavBar />
              {children}
            </Theme>
          </ThemeProviders>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
