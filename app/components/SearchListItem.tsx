import { User } from "~/utils/types"


interface Props {
  user: User
}

const SearchListItem: React.FC<Props> = ({ user }) => {
  return (
    <article key={user.id} className="flex items-center relative px-5 py-3 gap-4 rounded-md bg-slate-800 focus-within:[box-shadow:_0_0_0_2px_theme(colors.blue.300)]">
      <div className="relative w-14 aspect-square rounded-full contain-paint min-w-12">
        <img src={user.avatar_url} alt="" className="inset-0" />
      </div>

      <div className="flex flex-col flex-grow overflow-hidden">
        <h1 className="max-w-30 truncate font-bold">
          <a href={user.html_url} target="_blank" className="before:content-[''] before:absolute before:inset-0 focus-visible:outline-0">
            {user.login}
          </a>
        </h1>
      </div>
    </article>
  )
}

export default SearchListItem