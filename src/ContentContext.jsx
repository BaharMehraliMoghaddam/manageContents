import { createContext, useState } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';

export const ContentContext = createContext();

const fetchContents = async () => {
  const { data } = await axios.get('http://localhost:3000/users');
  return data;
};

export default function ContentProvider({ children }) {
  const { data: contents, refetch } = useQuery('contents', fetchContents, {
    initialData: [],
  });
  
  const [isEdit , setIsEdit] = useState(null);

  /*const submitData = (values) => {
      if (editId){
  
      }else{
      }
  }

  const handleDelete = (id) => {
      const newData = data.filter(item => item.id !== id)
      setData(newData)
  }

  const handleEdit = (id) => {

      setEditId(id)
  }

  console.log(editId)*/


  return (
    <ContentContext.Provider value={{ contents, refetch, isEdit, setIsEdit }}>
      {children}
    </ContentContext.Provider>
  );
}