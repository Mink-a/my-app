import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-switch";
import AppShell from "@/components/app-shell";

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

export default UserLayout;
