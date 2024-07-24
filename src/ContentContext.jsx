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

///l7:
/*{
      id: 1,
      contentName: "user test",
      lastName: "user L test",
      phoneNum: "09215767899",
      ship: "friend",
      email: "test@gmail.com",
    },
    {
      id: 2,
      contentName: "user test",
      lastName: "user L test",
      phoneNum: "09215767899",
      ship: "friend",
      email: "test@gmail.com",
    },
    {
      id: 3,
      contentName: "user test",
      lastName: "user L test",
      phoneNum: "09215767899",
      ship: "friend",
      email: "test@gmail.com",
    },*/