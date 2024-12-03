import { GITHUB_CATEGORIES } from "./constants";

export function isGithubCategory(value: string): value is GithubCategory {
  return GITHUB_CATEGORIES.some((cat) => cat.value === value)
}