import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
 import "../app/globals.css"
import ModelProvider from '@/components/providers/model-provider'

export const metadata = {
  title: 'Next.js 13 with Clerk',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
         <ModelProvider/>
          {children}
         
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}