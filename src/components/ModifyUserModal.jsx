import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Upload, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
const { Option } = Select;
import { updateDoc, doc } from 'firebase/firestore'; // Import Firestore update functions
import { db } from '../config/firebase'; // Import your Firebase configuration

const ModifyUserModal = ({ visible, onCancel, data }) => {
  
  const [form] = Form.useForm();
  useEffect(() => {
    // Set initial values when 'data' prop changes
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = async (values) => {
    try {
      const userRef = doc(db, "users", values.id);

      // Create an object with only the field(s) you want to update
      const updatedFields = { name: values.name, mode:values.mode};

      
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
      title="Edit User"
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
          <Input disabled />
        </Form.Item>
        <Form.Item name="name" label="User">
          <Input style={{ width: "100%" }} />
        </Form.Item>
    
        <Form.Item name="mode" label="Mode">
          <Select>
            <Option value="Premium">Premium</Option>
            <Option value="Free">Free</Option>
          </Select>
        </Form.Item>
      

        <Form.Item wrapperCol={{ span: 24 }} style={{ width: "100%", display: "flex", justifyContent: "end" }}>
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

export default ModifyUserModal;