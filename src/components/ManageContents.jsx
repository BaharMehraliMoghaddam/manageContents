import { useContext } from "react";
import AddContentsForm from "./AddContentsForm";
import TodoCard from "./TodoCard";
import { ContentContext } from "../ContentContext";

export default function ManageContents() {
  const contextData= useContext(ContentContext)
  return (
    <>
    <AddContentsForm/>
    {contextData.contents.map(item=><TodoCard key={item.id} id={item.id} name={item.contentName} lastName={item.lastName} PhoneNum={item.phoneNum} relationShip={item.ship} email={item.email}/>)}
    </>
  )
}
