import React, { useRef } from 'react'

export default function SearchBar({onFilterChange}) {
  return (
    <div>
        <input type="text" placeholder='جستوجو:' onChange={(e)=>onFilterChange(e.target.value)}/>
    </div>
  )
}
