import React, { useRef } from 'react'

export default function SearchBar({onFilterChange, filterText}) {
  return (
    <div className="w-full max-w-md mx-auto mt-10">
        <input type="text" placeholder='جستوجو:' className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>onFilterChange(e.target.value)} value={filterText}/>
    </div>
  )
}
