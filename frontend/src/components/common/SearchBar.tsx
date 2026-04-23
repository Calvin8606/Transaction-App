import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

export default function SearchBar(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="search-shell">
      <Search size={18} aria-hidden="true" />
      <span className="sr-only">Search</span>
      <input className="search-input" type="search" {...props} />
    </label>
  )
}
