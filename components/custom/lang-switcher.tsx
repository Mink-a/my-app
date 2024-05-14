'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Link, usePathname } from './locales'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()
  const otherLocale = locale === 'en' ? 'mya' : 'en'
  const pathname = usePathname()

  return (
    <Link href={pathname} locale={otherLocale}>
      {t('switchLocale', { locale: otherLocale })}
    </Link>
  )
}
