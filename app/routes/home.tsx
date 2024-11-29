import type { Route } from "./+types/home";
import Header from "~/components/Header";
import SearchList from "~/components/SearchList";
import { useLoaderData } from "react-router";

export default function Home() {
  useLoaderData
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <SearchList />
    </div>
  )
}
