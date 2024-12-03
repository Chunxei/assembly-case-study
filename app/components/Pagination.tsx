import { FC, PropsWithChildren, useMemo } from "react"


interface Props {
  page: number
  itemsPerPage: number
  totalItems: number
  urlSearch: string
}

const PaginationButton: FC<{disabled: boolean, href: string} & PropsWithChildren> = ({disabled, href, children}) => {
  return disabled ? (
    <div className="py-2 px-6 h-full font-bold rounded-md bg-slate-900">
      {children}
    </div>
  ) : (
    <a href={href} className="py-2 px-6 h-full font-bold bg-blue-600 rounded-md">
      {children}
    </a>
  )
}

const Pagination: React.FC<Props> = ({page, itemsPerPage, totalItems, urlSearch}) => {
  const isFirstPage = useMemo(() => page <= 1, [page])
  const isLastPage = useMemo(() => page >= (totalItems / itemsPerPage), [page, itemsPerPage, totalItems])

  const fmtSearch = (terms: Record<string, string | number>) => {
    const params = new URLSearchParams(urlSearch)
    for (const [key, val] of Object.entries(terms)) {
      params.set(key, `${val}`)
    }
    return `?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center md:justify-start gap-4 h-11">
      <PaginationButton href={fmtSearch({page: page - 1})} disabled={isFirstPage}>
        <p className="flex items-center gap-2 contain-layout">
          <span aria-hidden>&lt;</span>
          <span className="absolute opacity-0 md:static md:opacity-100">prev</span>
        </p>
      </PaginationButton>

      <div className="py-2 px-8 font-bold bg-slate-900 rounded-sm h-full">
        {page}
      </div>

      <PaginationButton href={fmtSearch({page: page + 1})} disabled={isLastPage}>
        <p className="flex items-center gap-2 contain-layout">
          <span className="absolute opacity-0 md:static md:opacity-100">next</span>
          <span aria-hidden>&gt;</span>
        </p>
      </PaginationButton>
    </div>
  )
}

export default Pagination