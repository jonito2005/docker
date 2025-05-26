import type React from "react"
import { Manrope } from "next/font/google"
import { Preloader } from "@/components/preloader"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <title>IMPHNEN - Ingin Menjadi Programmer Handal Namun Enggan Ngoding</title>
        <meta
          name="description"
          content="Komunitas programmer Indonesia untuk belajar programming tanpa stress. Belajar Programming Tanpa Nangis di Bawah Shower."
        />
      </head>
      <body className={manrope.className}>
        <Preloader />
        {children}
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
