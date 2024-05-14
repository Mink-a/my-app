import { ReactNode } from 'react'
import { Inter as FontSans } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { authOptions } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/components/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'

import '../globals.css'

type Props = {
  children: ReactNode
  params: { locale: string }
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages()
  const session = await getServerSession(authOptions)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <AuthProvider session={session}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
