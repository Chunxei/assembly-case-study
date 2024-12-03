import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router"
import { searchGithub } from "~/utils/api"
import SearchListItem from "./SearchListItem"
import Pagination from "./Pagination"
import { isGithubCategory } from "~/utils/helpers"
import SearchResults from "./SearchResults"

const RESULTS_PER_PAGE = 20

const SearchList: React.FC = () => {
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

    const search = (params.get('search') ?? '').trim()
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
        <SearchResults loading={loading} message={message} items={searchResult?.items ?? []} />
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