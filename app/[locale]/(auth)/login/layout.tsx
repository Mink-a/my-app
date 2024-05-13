import React from 'react'

function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className='grid h-svh place-items-center'>{children}</div>
}

export default LoginLayout
