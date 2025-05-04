import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Excel Fayl Tahlili va Anomaliyalarni Aniqlash",
  description: "Excel fayllarini yuklang va anomaliyalarni aniqlang",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col bg-secondary/20">
            <Navigation />
            <main className="flex-1">{children}</main>
            <footer className="py-4 px-8 bg-primary text-white text-center text-sm">
              <p>© {new Date().getFullYear()} Resource Guard - "Innovate" jamoasi tomonidan ishlab chiqilgan</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
