'use client'; // Error components must be Client Components

import { Button } from '@/components/custom/button';
import { UnauthorizedError } from '@/lib/exceptions';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}) {
  useEffect(() => {
    console.log({ error });
  }, [error]);

  return (
    <div className='grid h-[600px] place-content-center text-center'>
      <div className='space-y-8 text-center'>
        <h1 className='text-9xl font-black text-gray-300 dark:text-gray-600'>
          {error?.statusCode || 500}
        </h1>
        <p className='text-2xl font-bold tracking-tight text-gray-600 dark:text-gray-300 sm:text-4xl'>
          {error?.message || 'Something went wrong!'}
        </p>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
