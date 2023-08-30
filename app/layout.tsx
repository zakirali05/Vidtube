import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
 import "../app/globals.css"

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
         
          {children}
         
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}