"use client"; // Error components must be Client Components

import { Button } from "@/components/custom/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[600px] grid place-content-center text-center">
      <div className="text-center space-y-8">
        <h1 className="font-black text-gray-300 dark:text-gray-600 text-9xl">
          {error?.statusCode || 500}
        </h1>
        <p className="text-2xl font-bold tracking-tight text-gray-600 dark:text-gray-300 sm:text-4xl">
          {error?.message}
        </p>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
