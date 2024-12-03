import SearchListItem from "./SearchListItem"

interface Props {
  loading: boolean
  message: string
  items: User[]
}

const SearchResults: React.FC<Props> = ({items, loading, message}) => {
  if (loading) {
    return (
      <div className="w-full flex-grow flex justify-center items-center">
        <span className="text-xl text-slate-300 font-bold">
          Loading...
        </span>
      </div>
    )
  }

  if (message.length) {
    return (
      <div className="w-full flex-grow flex justify-center items-center">
        <span className="text-xl text-slate-300 font-bold">
          {message}
        </span>
      </div>
    )
  }

  return (
    <>
      {items.length ? (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(min(100%,_400px),_1fr))] auto-rows-[max-content] gap-4">
          {items.map((user) => (
            <SearchListItem user={user} key={user.id} />
          ))}
        </div>
      ) : (
        <div className="w-full flex-grow flex justify-center items-center">
          <span className="text-xl text-slate-300 font-bold">
            No results found for your search
          </span>
        </div>
      )}
    </>
  )
}

export default SearchResults