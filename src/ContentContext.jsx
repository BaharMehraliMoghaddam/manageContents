import { createContext, useState } from "react";

export const ContentContext = createContext();

export default function ContentProvider({ children }) {
  const [contents, setContents] = useState([
    
  ]);

  return (
    <ContentContext.Provider value={{ contents, setContents }}>
      {children}
    </ContentContext.Provider>
  );
}

