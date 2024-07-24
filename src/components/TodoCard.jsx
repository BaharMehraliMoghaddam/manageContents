import { useContext, useState } from "react";
import { ContentContext } from "../ContentContext";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

export default function TodoCard({
  id,
  name,
  lastName,
  PhoneNum,
  relationShip,
  email,
}) {
  const { contents, setContents, setEditContent ,updateContent} = useContext(ContentContext);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const deleteTodo = (id) => {
    setContents(contents.filter(item => item.id !== id));
    toast.success("مخاطب با موفقیت حذف شد");
    closeModal();
  }

  const editTodo = () => {
    updateContent({
      id,
      name,
      lastname: lastName,
      phnum: PhoneNum,
      relationship: relationShip,
      email
    });
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-md mx-auto mt-10">
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <p>{name}</p>
          <p>{lastName}</p>
          <p>{PhoneNum}</p>
          <p>{relationShip}</p>
          <p>{email}</p>
        </div>
        <div className="flex justify-between mt-3 gap-3">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
            onClick={openModal}
          >
            حذف
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
            onClick={editTodo}
          >
            ویرایش
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black opacity-90"
      >
        <h2 className="text-lg font-bold mb-4">آیا از حذف این مخاطب اطمینان دارید؟</h2>
        <div className="flex justify-center gap-4">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" onClick={closeModal}>انصراف</button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTodo(id)}>حذف</button>
        </div>
      </Modal>
    </div>
  );
}
/*import { useContext, useState } from "react";
import { ContentContext } from "../ContentContext";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

export default function TodoCard({
  id,
  name,
  lastName,
  PhoneNum,
  relationShip,
  email,
}) {
  const { contents, setContents } = useContext(ContentContext);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const deleteTodo = (id) => {
    setContents(contents.filter(item => item.id !== id));
    toast.success("مخاطب با موفقیت حذف شد");
    closeModal();
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-md mx-auto mt-10">
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <p>{name}</p>
          <p>{lastName}</p>
          <p>{PhoneNum}</p>
          <p>{relationShip}</p>
          <p>{email}</p>
        </div>
        <div className="flex justify-between mt-3 gap-3">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
            onClick={openModal}
          >
            حذف
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">
            ویرایش
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black opacity-90"
      >
        <h2 className="text-lg font-bold mb-4">آیا از حذف این مخاطب اطمینان دارید؟</h2>
        <div className="flex justify-center gap-4">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" onClick={closeModal}>انصراف</button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTodo(id)}>حذف</button>
        </div>
      </Modal>
    </div>
  );
}
*/