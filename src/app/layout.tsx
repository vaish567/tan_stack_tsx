import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from './providers/react_providers'


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'React TanStack Query',
  description: '=Veefin_solutions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}  antialiased`}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
