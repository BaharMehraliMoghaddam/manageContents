import axios from 'axios';  
import React, { useEffect, useState } from 'react';  
import { useQuery } from 'react-query';  
import SearchBar from './SearchBar';  
import TodoCard from './TodoCard';    
import Pagination from '../common/pagination';
  

export default function SearchContent() {  
  const [filterText, setFilterText] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);  
  
  const [users, setUsers] = useState([]);    
   

  const { isLoading, data, error, refetch, refetchInterval } = useQuery(  
    {
      queryKey:["users" , filterText, currentPage],
      queryFn:async () => {  
        const res = await axios.get(  
          `http://localhost:3000/users?q=${filterText || ""}&_page=${currentPage}&_limit=5`
          //`http://localhost:3000/users?_page=${currentPage}&_limit=5`
          //`http://localhost:3000/users?q=${filterText || ""}`  
        ); 
        //console.log(res.data); 
        return res.data;  
      },
    }
    
    //refetchInterval : 3000,
  );  


  
  const handlePageChange = (page) => {  
    setCurrentPage(page);  
  }; 
  useEffect(() => {  
    const fetchUsers = async () => {  
      try {  
        const response = await fetch('http://localhost:3000/users');  
        const data = await response.json();  
        setUsers(data);  
        console.log('Users fetched:', data);  
      } catch (error) {  
        console.error('Error fetching users:', error);  
      }  
    };  

    fetchUsers();  
    //fetch without rest!!!
  }, [users]);
  /*useEffect(() => {  
    refetch();   
  }, [data]);*/

  
  /*if (isLoading) {  
    return <div>Loading...</div>;  
  }*/
  
  /*if (error) {  
    return <div>Error: {error.message}</div>;  
  }  */
  return (  
    <div>  
      <SearchBar onFilterChange={(text) => setFilterText(text)} filterText={filterText}/>  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">  
        {isLoading? <div>Loading...</div> : error ? <div>Error: {error.message}</div> : data?.map((user) => (  
          <TodoCard key={user.id} id={user.id} name={user.contentName} lastName={user.lastName} PhoneNum={user.phoneNum} relationShip={user.ship} email={user.email}/>   
        ))}  
      </div>
      
      <Pagination  
        totalItems={users?.length || 0} 
        itemsPerPage={5}  
        currentPage={currentPage}  
        onPageChange={handlePageChange}  
      />    
    </div>  
  );  
}


