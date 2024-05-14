'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { usePagination } from '@/hooks/use-pagination'
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as Pg,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function Pagination({ totalCount }: { totalCount: number }) {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: 1,
    pageSize: limit,
  })

  const createPageURL = (
    pageNumber: number | string,
    limit: number | string
  ) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    params.set('limit', limit.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  const onNext = () => {
    createPageURL(currentPage + 1, limit)
  }

  const onPrevious = () => {
    createPageURL(currentPage - 1, limit)
  }

  const onRowsPerPageChange = (x: number) => {
    createPageURL(1, x)
  }

  const onPageChange = (currentPage: number) => {
    createPageURL(currentPage, limit)
  }

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1]

  if (!totalCount) return <></>

  return (
    <div className='mt-3 flex items-center'>
      <Select
        defaultValue={limit.toString()}
        onValueChange={(value: string) => onRowsPerPageChange(Number(value))}
      >
        <SelectTrigger className='w-[70px]'>
          <SelectValue placeholder='10' />
        </SelectTrigger>
        <SelectContent side='top'>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Pg className='ml-auto mr-0 w-auto'>
        <PaginationContent>
          <PaginationItem
            className={currentPage === 1 ? 'pointer-events-none' : ''}
          >
            <PaginationPrevious onClick={onPrevious} />
          </PaginationItem>
          {paginationRange?.map((pageNumber, index) => {
            if (pageNumber === 'dots') {
              return (
                <PaginationItem key={pageNumber + index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={Number(pageNumber) === currentPage}
                  onClick={() => {
                    onPageChange(Number(pageNumber))
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          <PaginationItem
            className={lastPage === currentPage ? 'pointer-events-none' : ''}
          >
            <PaginationNext onClick={onNext} />
          </PaginationItem>
        </PaginationContent>
      </Pg>
    </div>
  )
}

export default Pagination
