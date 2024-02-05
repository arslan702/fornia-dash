"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input, Select, Upload, Button, Form, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from 'next/image'
import { db } from "@/config/firebase"
const { Option } = Select;
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { message } from 'antd';
import { collection, getFirestore, getDocs, addDoc } from "firebase/firestore";
import { storage } from '@/config/firebase';
import { getStorage } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore';


const Index = () => {
  const storage = getStorage();

  const admin = {
    name: "James William",
    first: "James",
    last: "Williams",
    email: "james@email.com",
    phone: "1234567",
    country: "USA",
    city: "New York",
    password: "abcd123",
    address: "333 St Paun, New York, USA",
    role: "Director"
  };

  const [form] = Form.useForm();

  const [isFormEdited, setIsFormEdited] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); 

  const [ image, setImage] =useState('')
  const handleImagePreview = (e) => {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
      
    }
  };

  const handleFormChange = () => {
    setIsFormEdited(true);
  };

  const handleCategoryChange = (value) => {

  };

  const handleSubmit = async (values) => {
    if ((values.category && values.discription && values.email && values.firstName && values.lastName && values.phone && values.toolLink) === "") {
      message.error("Error, Feiled or Feilds are empty")
      return;
    }

    try {


   
       const imageRef = ref(storage, `/images/ ${image.name}`)

      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      console.log(imageUrl)
      addDoc(collection(db, 'news'), {
        discription: values.discription,
        firstName: values.firstName,
        category: values.category,
        lastName: values.lastName,
        phone: values.phone,
        imageUrl: imageUrl,
        toolLink: values.toolLink,
        joiningDate: serverTimestamp(),
      })
      message.success('News successfully Registered');





      console.log("Form values:", values);
    }
    catch (err) {
      console.log("thiiiiiiiiiis:", err)
    }
  };




  return (
    <div className="w-full h-full bg-[#F3F8FF] flex md:justify-center md:items-center py-5">
      <div className="rounded-md w-full md:w-[55%] px-[1.4rem] py-[2rem] overflow-hidden bg-[#FFFFFF] fontItems">
        <h1 className="text-[24px] font-[700] mb-4">Upload News</h1>
        <Form
          form={form}
          initialValues={{
            firstName: admin.first,
            lastName: admin.last,
            email: admin.email,
            phone: admin.phone,
            country: admin.country,
            city: admin.city,
            password: admin.password,
            address: admin.address,
            role: admin.role,
          }}
          onValuesChange={handleFormChange}
          onFinish={handleSubmit}
        >
          <div className="flex sm:flex-row flex-col items-center w-full">
            <div className="sm:mr-4 flex flex-col w-full">
              <label
                htmlFor="firstName"
                className="text-[16px] font-normal text-[#777777]"
              >
                First Name
              </label>
              <Form.Item name="firstName">
                <Input className="px-3 py-2 rounded-sm w-full" style={{ borderColor: "#2668E899", borderRadius: "5px", background: "#B4C7ED24", }} />
              </Form.Item>
            </div>
            <div className="w-full ">
              <label
                htmlFor="lastName"
                className="text-[16px] font-normal text-[#777777]"
              >
                Last Name
              </label>
              <Form.Item name="lastName">
                <Input className="px-3 py-2" style={{ borderColor: "#2668E899", borderRadius: "5px", background: "#B4C7ED24", }} />
              </Form.Item>
            </div>
          </div>

          <div className="flex w-full sm:flex-row flex-col">

            <div className="sm:mr-4 w-full">
              <label
                htmlFor="email"
                className="text-[16px] font-normal text-[#777777]"
              >
                Email Address
              </label>
              <Form.Item name="email">
                <Input className="px-3 py-2" style={{ borderColor: "#2668E899", borderRadius: "5px", background: "#B4C7ED24", }} />

              </Form.Item>
            </div>
            <div className="w-full">
              <label
                htmlFor="Phone Number"
                className="text-[16px] font-normal text-[#777777]"
              >
                Phone Number
              </label>
              <Form.Item name="phone">
                <Input className="px-3 py-2" style={{ borderColor: "#2668E899", borderRadius: "5px", background: "#B4C7ED24", }} />
              </Form.Item>
            </div>
          </div>

          <div className="flex items-center w-full sm:flex-row flex-col">
            <div className="sm:mr-4 w-full">
              <label
                htmlFor="Tool Link"
                className="text-[16px] font-normal text-[#777777]"
              >
                Tool
              </label>
              <Form.Item name="toolLink" >
                <Input className="px-3 py-2" placeholder="http://localhost:3000/" style={{ borderColor: "#2668E899", borderRadius: "5px", background: "#B4C7ED24", }} />

              </Form.Item>
            </div>
            <div className="w-full">
              <label
                htmlFor="Tool"
                className="text-[16px] font-normal "
              >
                Category
              </label>
              <Form.Item name="category">
                <Select >
                  {/* Populate options based on selected tool */}
                  <Option value="Updates" >Updates</Option>
                  <Option value="Interesting">Interesting</Option>
                  <Option value="Video" >Video</Option>
                  <Option value="Podcast">Podcast</Option>
                  <Option value="Learn" >Learn</Option>
                  <Option value="Research">Research</Option>
                  <Option value="Opinion">Opinion</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        
          <div className="w-full mb-12">
          {previewImage && <img src={previewImage} alt="Preview" className="my-4 max-w-[200px]" />}

           <div className="hidden"> <input type='file' onChange={handleImagePreview} className='hidden mb-10 ' accept="image/*" id="image-upload" /></div>
            <label htmlFor="image-upload" className='cursor-pointer bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold'>
              Select Image
            </label>
          </div>

          <div className="flex-col items-center">
            <div className="mr-4">
              <label
                htmlFor="Tool"
                className="text-[16px] font-normal text-[#777777]"
              >
                Description
              </label>
              <Form.Item name="discription" >
                <Input.TextArea placeholder="Only one line" className="px-3 py-2" style={{ borderColor: "#2668E899", borderRadius: "5px", background: "#B4C7ED24", resize: "none" }} />
              </Form.Item>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-[#2668E8] w-full sm:w-auto text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-700"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Index;
