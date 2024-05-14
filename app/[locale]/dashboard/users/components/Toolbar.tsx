import React from 'react'
import Link from 'next/link'
import { ROUTES } from '@/data/const'

import { buttonVariants } from '@/components/custom/button'
import { Search } from '@/components/custom/search'

export function Toolbar() {
  return (
    <div className='mb-4 flex justify-between'>
      <Search placeholder='Search...' />
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={ROUTES.usersCreate}
      >
        Create
      </Link>
    </div>
  )
}
