import { createContext, useState } from "react";

export const ContentContext = createContext();

export default function ContentProvider({ children }) {
  const [contents, setContents] = useState([]);
  const [editContent, setEditContent] = useState(null);
console.log(contents);
  const updateContent = (updatedContent) => {
    console.log(updatedContent);
    setContents((prevState) =>
      prevState.map((content) =>
        content.id === updatedContent.id
          ? {...content, ...updatedContent}
          : content
      )
    );
  };

  return (
    <ContentContext.Provider
      value={{
        contents,
        setContents,
        editContent,
        setEditContent,
        updateContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}
/*import { createContext, useState } from "react";

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
*/
