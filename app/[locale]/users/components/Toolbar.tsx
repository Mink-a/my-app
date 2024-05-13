import { buttonVariants } from '@/components/custom/button';
import { Search } from '@/components/custom/search';
import Link from 'next/link';
import React from 'react';

export function Toolbar() {
  return (
    <div className='mb-4 flex justify-between'>
      <Search placeholder='Search...' />
      <Link
        className={buttonVariants({ variant: 'default' })}
        href='/users/create'
      >
        Create
      </Link>
    </div>
  );
}
