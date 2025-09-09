import type React from "react"
import type { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Yew Tree Inn - Premium Restaurant in Glasgow",
  description:
    "Experience exceptional dining at Yew Tree Inn, Glasgow's premier restaurant offering modern twists on classic dishes in a beautiful setting.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
