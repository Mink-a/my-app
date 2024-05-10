import { LayoutDashboardIcon, UsersIcon } from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/",
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    title: "Users",
    label: "",
    href: "/users",
    icon: <UsersIcon size={18} />,
  },
];
