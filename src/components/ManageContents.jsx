import { useContext } from "react";
import AddContentsForm from "./AddContentsForm";
import TodoCard from "./TodoCard";
import { ContentContext } from "../ContentContext";

export default function ManageContents() {
  const { contents } = useContext(ContentContext);

  return (
    <>
    <AddContentsForm/>
    <div className="flex flex-col items-center justify-center">
      {contents.map((content) => (
        <TodoCard
          key={content.id}
          id={content.id}
          name={content.name}
          lastName={content.lastName}
          PhoneNum={content.PhoneNum}
          relationShip={content.relationShip}
          email={content.email}
        />
      ))}
    </div>
    </>
  );
}



  /*export default function ManageContents() {
    const contextData= useContext(ContentContext)
    return (
      <>
      <AddContentsForm/>
      {contextData.contents.map(item=><TodoCard key={item.id} id={item.id} name={item.contentName} lastName={item.lastName} PhoneNum={item.phoneNum} relationShip={item.ship} email={item.email}/>)}
      </>
    )
  }
  
  import TodoCard from "./TodoCard";
  */