import { DataTable } from "@/components/custom/data-table";
import { User, columns } from "./columns";
import Pagination from "@/components/custom/pagination";
import Search from "@/components/custom/search";
import { api } from "@/lib/my-fetcher";

async function getData({
  query,
  limit,
  page,
}: {
  query: string;
  limit: number;
  page: number;
}) {
  const users = await api.get<User[]>(
    `http://localhost:3333/api/users?page=${page}&limit=${limit}&search_query=${query}`,
  );
  return users;
}

export default async function UsersIndexPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  const data = await getData({ query: query, limit: limit, page: currentPage });

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <Search placeholder="Search..." />
      </div>
      <div className="container">
        <DataTable columns={columns} data={data} />
        <Pagination totalCount={100} />
      </div>
    </div>
  );
}
