import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "NeuronRush – Brain & Math Games",
  description: "Speed Math, Pattern Recognition, Memory Match & Arithmetic challenges",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
