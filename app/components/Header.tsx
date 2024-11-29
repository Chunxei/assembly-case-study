import { ChangeEventHandler, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import { GITHUB_CATEGORIES } from "~/utils/constants";

import { GithubCategoryListItem } from "~/utils/types";

const categoryValues = GITHUB_CATEGORIES.map((cat) => cat.value)

const Header: React.FC = () => {
  const searchEl = useRef<HTMLInputElement>(null)

  const location = useLocation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<GithubCategoryListItem['value']>(categoryValues[0])


  const updateSearchString: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {value} = e.target
    setSearch(value)
  }

  const updateCategory: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value as GithubCategoryListItem['value']
    setCategory(value)
  }
  
  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search)

    const prevSearch = params.get('search') ?? ''
    setSearch(decodeURIComponent(prevSearch))

    const prevCategory = params.get('category') as GithubCategoryListItem['value']
    if (categoryValues.includes(prevCategory)) setCategory(prevCategory)
  }, [])

  useEffect(() => {
    searchEl.current?.focus()
  }, [])

  return (
    <header className="w-full px-12 py-4 sticky top-0 border-b border-1 border-slate-600 z-50 bg-gray-950">
      <form
        action="/"
        method="GET"
        className="w-full flex flex-col flex-wrap md:flex-row md:items-center min-h-20 gap-x-10 gap-y-6 contained"
      >
        <label className="flex flex-col md:flex-row md:items-center gap-4">
          Name:
          <input
            ref={searchEl}
            type="search"
            name="search"
            value={search}
            onChange={updateSearchString}
            className="py-2 px-4 md:min-w-[min(30ch,_400px)] rounded-md bg-slate-800 border border-slate-400 outline-offset-4"
            required
            placeholder="e.g babel"
          />
        </label>

        <fieldset className="flex items-center gap-3">
          <legend className=" font-variant-caps-small">category:</legend>

          {GITHUB_CATEGORIES.map((cat) => (
            <label className="flex items-center gap-2 px-1 rounded-sm border border-transparent focus-within:border-blue-300" key={cat.value}>
              <input type="radio" name="category" value={cat.value} checked={category === cat.value} onChange={updateCategory} className="accent-blue-500 focus-visible:outline-none" />
              {cat.label}
            </label>
          ))}
        </fieldset>

        <button className="appearance-none h-full flex justify-center md:justify-start items-center w-full md:w-max px-6 py-2 bg-blue-600 rounded-md">Search</button>
      </form>
    </header>
  );
}

export default Header