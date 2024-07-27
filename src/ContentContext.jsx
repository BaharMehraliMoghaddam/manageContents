import { createContext } from "react";
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

  return (
    <ContentContext.Provider value={{ contents, refetch }}>
      {children}
    </ContentContext.Provider>
  );
}