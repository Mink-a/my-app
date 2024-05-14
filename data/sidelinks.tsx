import { LayoutDashboardIcon, UsersIcon } from 'lucide-react'

import { ROUTES } from './const'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: ROUTES.dashboard,
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    title: 'Users',
    label: '',
    href: ROUTES.users,
    icon: <UsersIcon size={18} />,
  },
]
