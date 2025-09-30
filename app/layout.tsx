"use client"

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { WagmiProvider, createConfig, http } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const metadata: Metadata = {
  title: "Ethos - Soulbound Token Minter",
  description: "Mint Soulbound Tokens with Ethos",
  generator: "v0.app",
}

const wagmiConfig = createConfig({
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http(),
  },
  // ...add connectors if needed...
})

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={null}>{children}</Suspense>
          </QueryClientProvider>
        </WagmiProvider>
        <Analytics />
      </body>
    </html>
  )
}
