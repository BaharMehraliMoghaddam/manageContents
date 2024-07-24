import { useContext } from "react";
import AddContentsForm from "./AddContentsForm";
import TodoCard from "./TodoCard";
import { ContentContext } from "../ContentContext";

export default function ManageContents() {
  const { contents } = useContext(ContentContext);

  return (
    <>
      <div className="m-4">
      <AddContentsForm />
      </div>
      <div className="flex flex-col items-center justify-center m-4">
        {contents.map((content) => (
          <TodoCard
            key={content.id}
            id={content.id}
            name={content.contentName}
            lastName={content.lastName}
            PhoneNum={content.phoneNum}
            relationShip={content.ship} 
            email={content.email}
          />
        ))}
      </div>
    </>
  );
}
