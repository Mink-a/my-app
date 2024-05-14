'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Input } from '../ui/input'

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Input
      className='md:w-[100px] lg:w-[300px]'
      placeholder={placeholder}
      onChange={(e) => {
        handleSearch(e.target.value)
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
  )
}
