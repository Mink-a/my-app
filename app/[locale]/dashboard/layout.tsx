import AppShell from '@/components/app-shell'

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AppShell>{children}</AppShell>
}

export default DashboardLayout
