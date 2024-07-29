import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import SearchBar from './SearchBar'
import TodoCard from './TodoCard'

export default function SearchContent() {
    const [filterText, setFilterText]=useState("")
    const{
        loading, data, isError, error, status, refetch
    }=useQuery({
        quaryKey:["data", filterText],
        quaryFn: async()=>{
            const res= await axios.get(
                `http://localhost:3000/users?name_like=${filterText}`
            )
            return res.data
        }
    })
    //console.log(data);
  return (
    <div>
        <SearchBar
        onFilterChange={(text)=>setFilterText(text)}
        />
        <TodoCard id={data}/>
    </div>
  )
}

