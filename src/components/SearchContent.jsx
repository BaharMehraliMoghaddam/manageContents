import axios from 'axios';  
import React, { useEffect, useState } from 'react';  
import { useQuery } from 'react-query';  
import SearchBar from './SearchBar';  
import TodoCard from './TodoCard';  

export default function SearchContent() {  
  const [filterText, setFilterText] = useState("");  

  const { isLoading, data, error, refetch, refetchInterval } = useQuery(  
    {
      queryKey:["users" , filterText],
      queryFn:async () => {  
        const res = await axios.get(  
          `http://localhost:3000/users?q=${filterText || ""}`  
        ); 
        //console.log(res.data); 
        return res.data;  
      },
    }
    
    //refetchInterval : 3000,
  );  

  /*useEffect(() => {  
    refetch();   
  }, [data]);*/

  /*if (isLoading) {  
    return <div>Loading...</div>;  
  }  

  if (error) {  
    return <div>Error: {error.message}</div>;  
  }  */
  //console.log(data);
  return (  
    <div>  
      <SearchBar onFilterChange={(text) => setFilterText(text)} filterText={filterText}/>  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">  
        {isLoading? <div>Loading...</div> : error ? <div>Error: {error.message}</div> : data?.map((user) => (  
          <TodoCard key={user.id} id={user.id} name={user.contentName} lastName={user.lastName} PhoneNum={user.phoneNum} relationShip={user.ship} email={user.email}/>   
        ))}  
      </div>  
    </div>  
  );  
}