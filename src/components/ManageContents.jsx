import { useContext } from "react";
import AddContentsForm from "./AddContentsForm";
//import TodoCard from "./TodoCard";
import { ContentContext } from "../ContentContext";
import SearchContent from "./SearchContent";

export default function ManageContents() {
  const { contents } = useContext(ContentContext);

  return (
    <>
      <div className="m-4">
      <AddContentsForm />
      </div>
      <div className="m-4">
        <SearchContent/>
      </div>
      <div className="flex flex-col items-center justify-center m-4">
        
      </div>
    </>
  );
}
/*{contents.map((content) => (
          <TodoCard
            key={content.id}
            id={content.id}
            name={content.contentName}
            lastName={content.lastName}
            PhoneNum={content.phoneNum}
            relationShip={content.ship} 
            email={content.email}
          />
        ))}*/
/*import React, { useState, useEffect } from "react";  
import { useMutation } from "react-query";  
import axios from "axios";  
import { toast } from "react-toastify";  
import TodoCard from './TodoCard';  

export default function ManageContents() {  
  const [users, setUsers] = useState([]);  
  const [editUser, setEditUser] = useState(null);  
  const [formValues, setFormValues] = useState({  
    name: "",  
    lastName: "",  
    PhoneNum: "",  
    relationShip: "",  
    email: "",  
  });  

  useEffect(() => {  
    fetchUsers();  
  }, []);  

  const fetchUsers = async () => {  
    const response = await axios.get("http://localhost:3000/users");  
    setUsers(response.data);  
  };  

  const mutationEdit = useMutation(  
    (user) => axios.put(`http://localhost:3000/users/${user.id}`, user),  
    {  
      onSuccess: () => {  
        toast.success("ویرایش با موفقیت انجام شد");  
        fetchUsers();  
        setEditUser(null);  
        setFormValues({  
          name: "",  
          lastName: "",  
          PhoneNum: "",  
          relationShip: "",  
          email: "",  
        });  
      },  
    }  
  );  

  const handleEdit = (user) => {  
    setEditUser(user);  
    setFormValues(user);  
  };  

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setFormValues((prevState) => ({  
      ...prevState,  
      [name]: value,  
    }));  
  };  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    mutationEdit.mutate({ ...formValues, id: editUser.id });  
  };  

  return (  
    <div>  
      {users.map((user) => (  
        <TodoCard  
          key={user.id}  
          {...user}  
          onEdit={handleEdit}  
        />  
      ))}  
      {editUser && (  
        <form onSubmit={handleSubmit}>  
          <input  
            name="name"  
            value={formValues.name}  
            onChange={handleInputChange}  
            placeholder="نام"  
          />  
          <input  
            name="lastName"  
            value={formValues.lastName}  
            onChange={handleInputChange}  
            placeholder="نام خانوادگی"  
          />  
          <input  
            name="PhoneNum"  
            value={formValues.PhoneNum}  
            onChange={handleInputChange}  
            placeholder="شماره تلفن"  
          />  
          <input  
            name="relationShip"  
            value={formValues.relationShip}  
            onChange={handleInputChange}  
            placeholder="نسبت"  
          />  
          <input  
            name="email"  
            value={formValues.email}  
            onChange={handleInputChange}  
            placeholder="ایمیل"  
          />  
          <button type="submit">  
            {editUser ? "ویرایش" : "اضافه کردن"}  
          </button>  
        </form>  
      )}  
    </div>  
  );  
}*/
