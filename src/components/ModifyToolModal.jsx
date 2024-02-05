import React, {useEffect} from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Select, Upload, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
const { Option } = Select;
import { updateDoc, doc } from 'firebase/firestore'; // Import Firestore update functions
import { db } from '../config/firebase'; // Import your Firebase configuration

const ModifyToolModal = ({ visible, onCancel, data }) => {
  const [form] = Form.useForm();
  console.log("DDAATTtaa:::",data)

  useEffect(() => {
    // Set initial values when 'data' prop changes
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = async (values) => {
    console.log("id>>||>>>", values.id  , "thisss");
    console.log("oooooooobject", values);
    try {
      const userRef = doc(db, "tools", values.id);

      // Create an object with only the field(s) you want to update
      const updatedFields = { title: values.title,category:values.category,  mode:values.mode};

      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(userRef, updatedFields);
        message.success('User Modified');
      }

      onCancel();
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("An error occurred while updating the user.");
    }
  };

  return (
    <Modal
      title="Edit Tool"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        initialValues={data}
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item name="id" label="ID">
          <Input disabled/>
        </Form.Item>
        <Form.Item name="title" label="Tool Title" rules={[{ required: true, message: 'Please input tool title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item  name="user" label="User">
          <Input disabled style={{width: "100%",}} />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Input  style={{width: "100%"}}/>
        </Form.Item>
        {/* <Form.Item name="joiningDate" label="Added Date">
          <DatePicker  style={{width: "100%"}} />
        </Form.Item>
       */}
        <Form.Item name="mode" label="Mode">
          <Select >
            <Option value="Trending">Trending</Option>
            <Option value="Featured">Featured</Option>
            <Option value="Alternate">Alternate</Option>
          </Select>
        </Form.Item>
        {/* <Form.Item name="toolImg" label="Tool Image">
          <Upload
            listType="picture-card"
            showUploadList={false}
            customRequest={({ onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
        
        <Form.Item wrapperCol={{ span: 24 }} style={{width: "100%", display: "flex", justifyContent: "end"}}>
        <button
                type="submit"
                className="mt-6 bg-[#2668E8] text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-700"
              >
                Update 
              </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModifyToolModal;
