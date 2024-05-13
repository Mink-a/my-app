import { DataTable } from '@/components/custom/data-table'
import { columns } from './columns'
import Pagination from '@/components/custom/pagination'
import fetchServer from '@/lib/fetch-server'
import { Toolbar } from './components/Toolbar'

async function getData({
  query,
  limit,
  page,
}: {
  query: string
  limit: number
  page: number
}) {
  const users = await fetchServer({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users?page=${page}&limit=${limit}&search_query=${query}`,
  })
  return users.json()
}

export default async function UsersIndexPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    limit?: string
  }
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || 10

  const data = await getData({ query: query, limit: limit, page: currentPage })

  return (
    <div className='container mx-auto'>
      <Toolbar />
      <div className='container'>
        <DataTable columns={columns} data={data} />
        <Pagination totalCount={100} />
      </div>
    </div>
  )
}
