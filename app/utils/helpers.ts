import { GITHUB_CATEGORIES } from "./constants";
import { GithubCategory } from "./types";

export function isGithubCategory(value: string): value is GithubCategory {
  return GITHUB_CATEGORIES.some((cat) => cat.value === value)
}