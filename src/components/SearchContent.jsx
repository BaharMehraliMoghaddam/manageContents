import axios from 'axios';  
import React, { useState } from 'react';  
import { useQuery } from 'react-query';  
import SearchBar from './SearchBar';  
import TodoCard from './TodoCard';  

export default function SearchContent() {  
  const [filterText, setFilterText] = useState("");  

  const { isLoading, data, error, refetch } = useQuery(  
    ["users"], // Remove filterText from quaryKey  
    async () => {  
      const res = await axios.get(  
        `http://localhost:3000/users?name_like=${filterText}`  
      );  
      return res.data;  
    }  
  );  

  // Invalidate the cache when the filterText changes  
  React.useEffect(() => {  
    refetch();   
  }, [filterText]);   

  if (isLoading) {  
    return <div>Loading...</div>;  
  }  

  if (error) {  
    return <div>Error: {error.message}</div>;  
  }  

  return (  
    <div>  
      <SearchBar onFilterChange={(text) => setFilterText(text)} />  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
        {data.map((user) => (  
          <TodoCard key={user.id} id={user.id} name={user.name} lastName={user.lastName} PhoneNum={user.PhoneNum} relationShip={user.relationShip} email={user.email}/>   
        ))}  
      </div>  
    </div>  
  );  
}