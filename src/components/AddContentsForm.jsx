import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { ContentContext } from "../ContentContext";

export default function AddContentsForm() {
    const contextData= useContext(ContentContext)

    const [nameInputVal, setnameInputVal]=useState("")
    const [lastNameInputVal, setlastNameInputVal]=useState("")
    const [PhoneNumInputVal, setPhoneNumInputVal]=useState("")
    const [relationShipInputVal, setrelationShipInputVal]=useState("")
    const [emailInputVal, setemailInputVal]=useState("")

    function addNewTodo(){
      const newTodo = {
        id:Date.now(),
        name:nameInputVal,
        lastName:lastNameInputVal,
        PhoneNum: PhoneNumInputVal,
        relationShip: relationShipInputVal,
        email:emailInputVal
      }

      contextData.setContent([...contextData.contents, newTodo])

      /*let temp = contextData.contents
      temp.todoList.push({
        id:Date.now(),
        name:nameInputVal,
        lastName:lastNameInputVal,
        PhoneNum: PhoneNumInputVal,
        relationShip: relationShipInputVal,
        email:emailInputVal
      })
      contextData.setContents()*/
    }

    return (
        <Formik
            initialValues={{ name: "", lastname: "", phnum: "", relationship: "", email: "" }}
            onSubmit={(values, { validate }) => {
                validate(values);
                createNew({ name: values.name, lastname: values.lastname, phnum: values.phnum, relationship: values.relationship, email: values.email });
            }}
            validationSchema={Yup.object({
                name: Yup.string("فیلد مرتبط با نام باید تنها شامل حروف الفبا باشد").required("فیلد مرتبط با نام خالی است").max(20, "حداکثر وارد کردن بیست حرف معتبر است").min(3, "نام حداقل باید متشکل از سه حرف باشد"),
                lastname: Yup.string("فیلد مرتبط با نام خانوادگی باید تنها شامل حروف الفبا باشد").required("فیلد مرتبط با نام خانوادگی خالی است").max(20, "حداکثر وارد کردن بیست حرف معتبر است").min(3, "نام خانوادگی حداقل باید متشکل از سه حرف باشد"),
                phnum: Yup.number("شماره تلفن باید تنها شامل اعداد باشد").required("فیلد مرتبط با شماره تلفن خالی است").moreThan(10, "شماره تلفن باید ۱۱ رقم باشد").lessThan(12, "شماره تلفن باید ۱۱ رقم باشد"),
                email: Yup.string("ایمیل معتبر نیست").required("فیلد مربوط به ایمیل خالی است").email("ایمیل معتبر نیست"),
            })}
            
            validateOnChange={false}
        >
            {({ errors }) => (
                <Form className="w-full max-w-md mx-auto mt-10">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">نام</label>
                  <input id="name" name="name" placeholder="نام مخاطب" onChange={(e)=>setnameInputVal(e.target.value)} value={nameInputVal} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-red-500">{errors.name}</span>
                </div>
                <div className="mb-4">
                  <label htmlFor="lastname" className="block text-gray-700">نام خانوادگی</label>
                  <input id="lastname" name="lastname" placeholder="نام خانوادگی مخاطب" onChange={(e)=>setlastNameInputVal(e.target.value)} value={lastNameInputVal} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-red-500">{errors.lastname}</span>
                </div>
                <div className="mb-4">
                  <label htmlFor="phnum" className="block text-gray-700">شماره تماس</label>
                  <input id="phnum" name="phnum" placeholder="09121000100" onChange={(e)=>setPhoneNumInputVal(e.target.value)} value={PhoneNumInputVal} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-red-500">{errors.phnum}</span>
                </div>
                <div className="mb-4">
                  <select name="relationship" onChange={(e)=>setrelationShipInputVal(e.target.value)} value={relationShipInputVal} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>نسبت</option>
                    <option value="nucler-family">اعضای خانواده</option>
                    <option value="friend">دوست</option>
                    <option value="college">همکار</option>
                    <option value="family">فامیل</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">ایمیل</label>
                  <input id="email" name="email" type="email" placeholder="content@example.com" onChange={(e)=>setemailInputVal(e.target.value)} value={emailInputVal}  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-red-500">{errors.email}</span>
                </div>
                <div className="flex justify-center">
                  <button type="submit" onSubmit={addNewTodo} className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">اضافه کردن</button>
                </div>
              </Form>
            )}
        </Formik>
    );
}

/*import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { ContentContext } from "../ContentContext";

export default function AddContentsForm() {
    const {createNew}= useContext(ContentContext)
    //const getContent=(text)=>getNewContent(text)
  return (
    <Formik
     initialValues={{name:"", lastname:"", phnum: "",relationship:"", email:""}}
     onSubmit={(values), {validate}}=>{
        validate(values)
        createNew({name:values.name, lastname: values.lastname, phnum:values.phnum, relationship:values.relationship, email:values.email})
     }
     validationSchema={Yup.object({
        name:Yup.string().required().max(20).min(3),
        lastname:Yup.string().required().max(20).min(3),
        phnum:Yup.number().required().moreThan(10).lessThan(12),
        //relationship:Yup.required(),
        email:Yup.string().required().email(),
     })}
     validateOnChange={false}
    >
        {({ errors }) => (
        <Form className="flex items-center justify-center flex-col">
          <Field id="name" name="name" placeholder="نام"></Field>
          <span>{errors.name}</span>
          <Field id="lastname" name="lastname" placeholder="نام خانوادگی"></Field>
          <span>{errors.lastname}</span>
          <Field id="phnum" name="phnum" placeholder="شماره تماس"></Field>
          <span>{errors.phnum}</span>
          <Field as="select" name="relationship">
            <option value="relationship" disabled>نسبت</option>
            <option value="nucler-family">اعضای خانواده</option>
            <option value="friend">دوست</option>
            <option value="college">همکار</option>
            <option value="family">فامیل</option>
          </Field>
          
          <Field id="email" name="email" type="email" placeholder="ایمیل"></Field>
          <span>{errors.email}</span>
        <button type="submit">اضافه کردن</button>
        </Form>
        )}
    </Formik>
  );
}*/

/*<span>{errors.name}</span>
<span>{errors.lastname}</span>
<span>{errors.phnum}</span>
<span>{errors.Position}</span>
<span>{errors.email}</span>
*/

/*<Field
             component="select"
             id="Position"
             name="Position"
             multiple={true}
             //placeholder="نسبت"
             >
             
          </Field>*/

/*<Form className="flex items-center justify-start flex-col w-full h-[40vh] gap-2">
                    <Field id="name" name="name" placeholder="نام" />
                    <span>{errors.name}</span>
                    <Field id="lastname" name="lastname" placeholder="نام خانوادگی" />
                    <span>{errors.lastname}</span>
                    <Field id="phnum" name="phnum" placeholder="شماره تماس" />
                    <span>{errors.phnum}</span>
                    <Field as="select" name="relationship">
                        <option value="" disabled>نسبت</option>
                        <option value="nucler-family">اعضای خانواده</option>
                        <option value="friend">دوست</option>
                        <option value="college">همکار</option>
                        <option value="family">فامیل</option>
                    </Field>
                    <Field id="email" name="email" type="email" placeholder="ایمیل" />
                    <span>{errors.email}</span>
                    <button type="submit">اضافه کردن</button>
                </Form>*/          


                ///////////////////////
/*<Form className="w-full max-w-sm mx-auto">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">نام</label>
                  <Field id="name" name="name" placeholder="نام" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-red-500">{errors.name}</span>
                </div>
                <div className="mb-4">
                  <label htmlFor="lastname" className="block text-gray-700">نام خانوادگی</label>
                  <Field id="lastname" name="lastname" placeholder="نام خانوادگی" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-red-500">{errors.lastname}</span>
                </div>
                <div className="mb-4">
                  <label htmlFor="phnum" className="block text-gray-700">شماره تماس</label>
                  <Field id="phnum" name="phnum" placeholder="شماره تماس" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-red-500">{errors.phnum}</span>
                </div>
                <div className="mb-4">
                  <label htmlFor="relationship" className="block text-gray-700">نسبت</label>
                  <Field as="select" name="relationship" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>نسبت</option>
                    <option value="nucler-family">اعضای خانواده</option>
                    <option value="friend">دوست</option>
                    <option value="college">همکار</option>
                    <option value="family">فامیل</option>
                  </Field>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">ایمیل</label>
                  <Field id="email" name="email" type="email" placeholder="ایمیل" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-red-500">{errors.email}</span>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">اضافه کردن</button>
                </div>
              </Form>*/                