import Header from "~/components/Header";
import SearchList from "~/components/SearchList";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <SearchList />
    </div>
  )
}
