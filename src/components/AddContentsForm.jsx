import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { ContentContext } from "../ContentContext";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
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
    control,
    handleSubmit,
    formState: { errors },
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

  const { refetch } = useContext(ContentContext);

  const mutation = useMutation(
    (newContent) => axios.post("http://localhost:3000/users", newContent),
    {
      onSuccess: () => {
        toast.success("مخاطب با موفقیت اضافه شد");
        refetch();
      },
    }
  );

  const onSubmit = (data) => {
    const newTodo = {
      id: Date.now(),
      contentName: data.name,
      lastName: data.lastname,
      phoneNum: data.phnum,
      ship: data.relationship,
      email: data.email,
    };

    mutation.mutate(newTodo);
  };

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
          اضافه کردن
        </button>
      </div>
    </form>
  );
}
/*import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { ContentContext } from "../ContentContext";
import { toast } from "react-toastify";
import { useMutation } from 'react-query';
import axios from 'axios';


export default function AddContentsForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      phnum: "",
      relationship: "",
      email: ""
    },
    resolver: yupResolver(
      Yup.object({
        name: Yup.string("فیلد مرتبط با نام باید تنها شامل حروف الفبا باشد")
          .required("فیلد مرتبط با نام خالی است")
          .max(20, "حداکثر وارد کردن بیست حرف معتبر است")
          .min(3, "نام حداقل باید متشکل از سه حرف باشد"),
        lastname: Yup.string(
          "فیلد مرتبط با نام خانوادگی باید تنها شامل حروف الفبا باشد"
        )
          .required("فیلد مرتبط با نام خانوادگی خالی است")
          .max(20, "حداکثر وارد کردن بیست حرف معتبر است")
          .min(3, "نام خانوادگی حداقل باید متشکل از سه حرف باشد"),
        phnum: Yup.string()
          .matches(/^[0-9]+$/, "شماره تلفن باید تنها شامل اعداد باشد")
          .required("فیلد مرتبط با شماره تلفن خالی است")
          .min(11, "شماره تلفن باید ۱۱ رقم باشد")
          .max(11, "شماره تلفن باید ۱۱ رقم باشد"),
        relationship: Yup.string("لطفا یک نسبت معتبر انتخاب کنید").required("لطفا یک نسبت معتبر انتخاب کنید"),
        email: Yup.string("ایمیل معتبر نیست")
          .required("فیلد مربوط به ایمیل خالی است")
          .email("ایمیل معتبر نیست")
      })
    )
  });
  const { refetch } = useContext(ContentContext);

  const mutation = useMutation(newContent => axios.post('http://localhost:3000/users', newContent), {
    onSuccess: () => {
      toast.success("مخاطب با موفقیت اضافه شد");
      refetch();
    },
  });

  const onSubmit = (data) => {
    const newTodo = {
      id: Date.now(),
      contentName: data.name,
      lastName: data.lastname,
      phoneNum: data.phnum,
      ship: data.relationship,
      email: data.email,
    };

    mutation.mutate(newTodo);

    contextData.setContents([...contextData.contents, newTodo]);
    toast.success("مخاطب با موفقیت اضافه شد");
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto mt-10">
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
          اضافه کردن
        </button>
      </div>
    </form>
  );
}*/

/*import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { ContentContext } from "../ContentContext";
import { toast } from "react-toastify";

export default function AddContentsForm() {
  const contextData = useContext(ContentContext);
  return (
    <Formik
      initialValues={{
        name: "",
        lastname: "",
        phnum: "",
        relationship: "",
        email: "",
      }}
      onSubmit={(values) => {
        const newTodo = {
          id:Date.now() ,
          contentName: values.name,
          lastName: values.lastname,
          phoneNum: values.phnum,
          ship: values.relationship,
          email: values.email,
        };

        contextData.setContents([...contextData.contents, newTodo]);
        //console.log(contextData.contents);
        toast.success("مخاطب با موفقیت اضافه شد");
      }}
      validationSchema={Yup.object({
        name: Yup.string("فیلد مرتبط با نام باید تنها شامل حروف الفبا باشد")
          .required("فیلد مرتبط با نام خالی است")
          .max(20, "حداکثر وارد کردن بیست حرف معتبر است")
          .min(3, "نام حداقل باید متشکل از سه حرف باشد"),
        lastname: Yup.string(
          "فیلد مرتبط با نام خانوادگی باید تنها شامل حروف الفبا باشد"
        )
          .required("فیلد مرتبط با نام خانوادگی خالی است")
          .max(20, "حداکثر وارد کردن بیست حرف معتبر است")
          .min(3, "نام خانوادگی حداقل باید متشکل از سه حرف باشد"),
        phnum: Yup.string()
          .matches(/^[0-9]+$/, "شماره تلفن باید تنها شامل اعداد باشد")
          .required("فیلد مرتبط با شماره تلفن خالی است")
          .min(11, "شماره تلفن باید ۱۱ رقم باشد")
          .max(11, "شماره تلفن باید ۱۱ رقم باشد"),
        relationship: Yup.string("لطفا یک نسبت معتبر انتخاب کنید").required("لطفا یک نسبت معتبر انتخاب کنید"),
        email: Yup.string("ایمیل معتبر نیست")
          .required("فیلد مربوط به ایمیل خالی است")
          .email("ایمیل معتبر نیست"),
      })}

      //validateOnChange={true}
    >
      {({ errors }) => {
        return (
          <Form className="w-full max-w-md mx-auto mt-10">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                نام
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="نام مخاطب"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500">{errors.name}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block text-gray-700">
                نام خانوادگی
              </label>
              <Field
                id="lastname"
                name="lastname"
                placeholder="نام خانوادگی مخاطب"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500">{errors.lastname}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="phnum" className="block text-gray-700">
                شماره تماس
              </label>
              <Field
                //type="number"
                id="phnum"
                name="phnum"
                placeholder="09121000100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500">{errors.phnum}</span>
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="relationship"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  نسبت
                </option>
                <option value="اعضای خانواده">اعضای خانواده</option>
                <option value="دوست">دوست</option>
                <option value="همکار">همکار</option>
                <option value="فامیل">فامیل</option>
              </Field>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                ایمیل
              </label>
              <Field
                id="email"
                name="email"
                //type="email"
                placeholder="content@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500">{errors.email}</span>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full font-bold md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                اضافه کردن
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}*/
