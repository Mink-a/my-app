'use client'
import { usePathname } from 'next/navigation'

export default function useCheckActiveNav() {
  const pathname = usePathname()

  const checkActiveNav = (nav: string) => {
    const pathArray = pathname.split('/').filter((item) => item !== '')

    if (nav === '/' && pathArray.length < 1) return true

    return pathname === nav
  }

  return { checkActiveNav }
}
