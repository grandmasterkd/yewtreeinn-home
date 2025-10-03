import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const bebasNeue = localFont({
  src: "./fonts/BebasNeue-Regular.woff2",
  variable: "--font-bebas-neue",
  display: "swap",
  weight: "400",
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
