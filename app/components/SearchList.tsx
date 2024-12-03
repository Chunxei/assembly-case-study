import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router"
import { searchGithub } from "~/utils/api"
import { GithubCategoryListItem, UsersResponse } from "~/utils/types"
import SearchListItem from "./SearchListItem"
import Pagination from "./Pagination"
import { GITHUB_CATEGORIES } from "~/utils/constants"
import { isGithubCategory } from "~/utils/helpers"

const RESULTS_PER_PAGE = 20

const SearchList: React.FC<{}> = (props) => {
  const location = useLocation()

  const [searchResult, setSearchResult] = useState<UsersResponse | null>(null)
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const showPagination = useMemo(() => !!searchResult?.items.length, [searchResult])

  const handleSearch = async (search: string, category: GithubCategoryListItem['value'], pageNo: number) => {
    setLoading(true)
    setMessage('')
    setPage(1)

    const {message: feedback, data} = await searchGithub(search, category, pageNo, RESULTS_PER_PAGE)

    if (feedback) setMessage(feedback)
    if (data) {
      setPage(pageNo)
      setSearchResult(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    const search = params.get('search') ?? ''
    const _category = decodeURIComponent(params.get('category') ?? '').toLowerCase()
    const category = isGithubCategory(_category) ? _category : 'user'
    const pageNo = parseInt(params.get('page') ?? '') || 1

    if (!search || !category) return

    handleSearch(search, category, pageNo)
  }, [location.search])

  return (
    <main className="flex flex-col flex-grow px-12 py-8">
      <section
        className="w-full appearance-none list-none flex-grow gap-4 flex flex-col pb-8 contained"
      >
        {loading ? (
          <div className="w-full flex-grow flex justify-center items-center">
            <span className="text-xl text-slate-300 font-bold">
              Loading...
            </span>
          </div>
        ) : !!message.length ? (
          <div className="w-full flex-grow flex justify-center items-center">
            <span className="text-xl text-slate-300 font-bold">
              {message}
            </span>
          </div>
        ) : !searchResult?.items.length ? (
          <div className="w-full flex-grow flex justify-center items-center">
            <span className="text-xl text-slate-300 font-bold">
              No results found for your search
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(min(100%,_400px),_1fr))] auto-rows-[max-content] gap-4">
            {searchResult?.items.map((user) => (
              <SearchListItem user={user} key={user.id} />
            ))}
          </div>
        )}
      </section>

      {showPagination && (
        <div className="w-full contained sticky bottom-0 bg-gray-950 py-4">
          <Pagination
            page={page}
            itemsPerPage={RESULTS_PER_PAGE}
            totalItems={searchResult?.total_count ?? 0}
            urlSearch={location.search}
          />
        </div>
      )}
    </main>
  )
}

export default SearchList