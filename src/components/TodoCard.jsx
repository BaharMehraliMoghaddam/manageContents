export default function TodoCard({
  id,
  name,
  lastName,
  PhoneNum,
  relationShip,
  email,
}) {
  return (
    <div className="flex w-full items-center justify-center">
    <div className="flex items-center justify-center flex-col border border-gray-300 w-fit p-4 rounded-md">
      <div className="flex items-start justify-center gap-3">
        <p>{name}</p>
        <p>{lastName}</p>
        <p>{PhoneNum}</p>
        <p>{relationShip}</p>
        <p>{email}</p>
      </div>
      <div className="flex justify-between">
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
          حذف
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">
          ویرایش
        </button>
      </div>
    </div>
    </div>
  );
}

/*    <div className="flex items-center justify-center flex-col">
        <div className="flex items-start justify-center gap-3">
        <p>{name}</p>
        <p>{lastName}</p>
        <p>{PhoneNum}</p>
        <p>{relationShip}</p>
        <p>{email}</p>
        </div>
        <div className="flex justify-between">
        <button>Delete</button>
        <button>Edit</button>
        </div>
    </div>*/
