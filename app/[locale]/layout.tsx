import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getMessages } from 'next-intl/server';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AuthProvider session={session}>{children}</AuthProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
