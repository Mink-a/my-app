import React from "react";

function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="grid place-items-center h-svh">{children}</div>;
}

export default LoginLayout;
