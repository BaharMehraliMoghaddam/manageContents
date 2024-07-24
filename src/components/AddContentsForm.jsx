import { Field, Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import * as Yup from "yup";
import { ContentContext } from "../ContentContext";
import { toast } from "react-toastify";

export default function AddContentsForm() {
  const { contents, setContents, editContent, setEditContent, updateContent } = useContext(ContentContext);

  return (
    <Formik
      initialValues={editContent || {
        id: null,
        name: "",
        lastname: "",
        phnum: "",
        relationship: "",
        email: "",
      }}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        if (editContent) {
          updateContent(values);
          toast.success("مخاطب با موفقیت ویرایش شد");
          setEditContent(null);
        } else {
          const newTodo = {
            id: Date.now(),
            contentName: values.name,
            lastName: values.lastname,
            phoneNum: values.phnum,
            ship: values.relationship,
            email: values.email,
          };

          setContents([...contents, newTodo]);
          toast.success("مخاطب با موفقیت اضافه شد");
        }
        resetForm();
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
    >
      {({ errors, handleSubmit, values, setValues }) => (
        <Form className="w-full max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
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
              {editContent ? "ویرایش" : "اضافه کردن"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

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
}
*/