'use client'
import { Layout, LayoutHeader } from './custom/layout'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { UserNav } from './user-nav'
import { ThemeToggle } from './theme-switch'

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? 'md:ml-14' : 'md:ml-64'
        } h-full`}
      >
        <Layout>
          <LayoutHeader className='sticky top-0 justify-between px-4 py-3 md:shadow '>
            <div className='ml-auto flex items-center space-x-4'>
              {/* <Search placeholder='Search' /> */}
              <ThemeToggle />
              <UserNav />
            </div>
          </LayoutHeader>
          {children}
        </Layout>
      </main>
    </div>
  )
}
