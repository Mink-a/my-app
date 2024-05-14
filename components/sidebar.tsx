'use client'

import { useEffect, useState } from 'react'
import { sidelinks } from '@/data/sidelinks'
import { ChevronLeftIcon, CrossIcon, MenuIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from './custom/button'
import { Layout, LayoutHeader } from './custom/layout'
import Logo from './custom/logo'
import Nav from './nav'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed inset-x-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? 'md:w-14' : 'md:w-64'
        }`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-opacity delay-100 duration-700 ${
          navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
        } w-full bg-black md:hidden`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className='sticky top-0 justify-between px-4 py-3 shadow md:px-4'>
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            <Logo isCollapsed />
            <div
              className={`flex flex-col justify-end truncate ${
                isCollapsed ? 'invisible w-0' : 'visible w-auto'
              }`}
            >
              <span className='font-medium'>Shadcn Admin</span>
              <span className='text-xs'>Vite + ShadcnUI</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <CrossIcon /> : <MenuIcon />}
          </Button>
        </LayoutHeader>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`h-full flex-1 overflow-auto ${
            navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 hidden rounded-full md:inline-flex'
        >
          <ChevronLeftIcon
            className={`size-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
