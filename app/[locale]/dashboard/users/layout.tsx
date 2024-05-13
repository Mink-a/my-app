import { LayoutBody } from '@/components/custom/layout'

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutBody>{children}</LayoutBody>
}

export default UserLayout
