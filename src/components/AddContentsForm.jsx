import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { ContentContext } from "../ContentContext";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string("فیلد مرتبط با نام باید تنها شامل حروف الفبا باشد")
    .required("فیلد مرتبط با نام خالی است")
    .max(20, "حداکثر وارد کردن بیست حرف معتبر است")
    .min(3, "نام حداقل باید متشکل از سه حرف باشد"),
  lastname: yup.string(
    "فیلد مرتبط با نام خانوادگی باید تنها شامل حروف الفبا باشد"
  )
    .required("فیلد مرتبط با نام خانوادگی خالی است")
    .max(20, "حداکثر وارد کردن بیست حرف معتبر است")
    .min(3, "نام خانوادگی حداقل باید متشکل از سه حرف باشد"),
  phnum: yup.string()
    .matches(/^[0-9]+$/, "شماره تلفن باید تنها شامل اعداد باشد")
    .required("فیلد مرتبط با شماره تلفن خالی است")
    .min(11, "شماره تلفن باید ۱۱ رقم باشد")
    .max(11, "شماره تلفن باید ۱۱ رقم باشد"),
  relationship: yup.string("لطفا یک نسبت معتبر انتخاب کنید").required(
    "لطفا یک نسبت معتبر انتخاب کنید"
  ),
  email: yup.string("ایمیل معتبر نیست")
    .required("فیلد مربوط به ایمیل خالی است")
    .email("ایمیل معتبر نیست"),
});

export default function AddContentsForm() {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      lastname: "",
      phnum: "",
      relationship: "",
      email: "",
    },
  });

  const { refetch ,isEdit,setIsEdit} = useContext(ContentContext);
  //react-query add card
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newContent) => axios.post("http://localhost:3000/users", newContent),
    {
      onSuccess: () => {
        toast.success("مخاطب با موفقیت اضافه شد");
        //refetch();
        queryClient.invalidateQueries(["users"])
      },
    }
  );

  //react-query edit card
  const editMutation= useMutation(
    (editedContent)=> axios.put(`http://localhost:3000/users/${isEdit.id}`, editedContent),
    {
      onSuccess:()=>{
        toast.success("مخاطب با موفقیت ویرایش شد");
        queryClient.invalidateQueries(["users"])
      }
    }
  )
  //submit btn
  const onSubmit = (data) => {
    if (!isEdit){
      const newTodo = {
        id: Date.now(),
        contentName: data.name,
        lastName: data.lastname,
        phoneNum: data.phnum,
        ship: data.relationship,
        email: data.email,
      };
  
      mutation.mutate(newTodo);
      reset()
    }else{
      //console.log(isEdit);
      const editedTodo = {
        contentName: data.name,
        lastName: data.lastname,
        phoneNum: data.phnum,
        ship: data.relationship,
        email: data.email,
      };
      console.log(data)
      editMutation.mutate(editedTodo)
      setIsEdit(null)
      reset()
    }
  };

  if(isEdit){
    setValue("name",isEdit.name)
    setValue("lastname",isEdit.lastName)
    setValue("phnum",isEdit.PhoneNum)
    setValue("relationship",isEdit.relationShip)
    setValue("email",isEdit.email)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto mt-10"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">
          نام
        </label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <input
              type="text"
              id="name"
              {...field}
              placeholder="نام مخاطب"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        <span className="text-red-500">{errors.name?.message}</span>
      </div>
      <div className="mb-4">
        <label htmlFor="lastname" className="block text-gray-700">
          نام خانوادگی
        </label>
        <Controller
          control={control}
          name="lastname"
          render={({ field }) => (
            <input
              id="lastname"
              {...field}
              placeholder="نام خانوادگی مخاطب"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        <span className="text-red-500">{errors.lastname?.message}</span>
      </div>
      <div className="mb-4">
        <label htmlFor="phnum" className="block text-gray-700">
          شماره تماس
        </label>
        <Controller
          control={control}
          name="phnum"
          render={({ field }) => (
            <input
              //type="number"
              id="phnum"
              {...field}
              placeholder="09121000100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        <span className="text-red-500">{errors.phnum?.message}</span>
      </div>
      <div className="mb-4">
        <Controller
          control={control}
          name="relationship"
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                نسبت
              </option>
              <option value="اعضای خانواده">اعضای خانواده</option>
              <option value="دوست">دوست</option>
              <option value="همکار">همکار</option>
              <option value="فامیل">فامیل</option>
            </select>
          )}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          ایمیل
        </label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <input
              id="email"
              {...field}
              placeholder="content@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        <span className="text-red-500">{errors.email?.message}</span>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full font-bold md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEdit? "ویرایش" :" اضافه کردن"}
        </button>
      </div>
    </form>
  );
}
