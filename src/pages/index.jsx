import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from 'next/link'
import Image from 'next/image'
import {message} from "antd"
import { useRouter } from "next/router";
import { auth } from '@/config/firebase/';
import cookie from "js-cookie"
import Loader from "@/components/Loader";
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async () => {

    try {
      
        const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
        const user = userCredential.user;
        

        cookie.set("admin", JSON.stringify(user))

        message.success('Admin Logged in successfully');
        setTimeout(() => {
          router.push('/toolList');
        }, 2000);

    } catch (error) {
      message.error("Error Logging in ")
    }

  };
  return (
    <div className="flex h-screen justify-center items-center bg-[#042757]">
      <div className="text-center  rounded-md px-4 sm:px-7 py-7 "
        style={{
          backgroundColor: "#4e6583",
          backdropFilter: "blur(20px)",
          border: "1px solid #41628F",
        }}
      >
        {/* <h1 className="text-4xl font-bold text-white mb-2 fontNew">AI Work Directory</h1> */}
        <div className="relative w-full h-[70px] sm:w-100 sm:h-[100px]">
          <Image src="/aiWorkLogo.png" fill objectFit="contain" />
        </div>
        <p className="text-white text-xl tracking-wide mb-3 fontNew">Admin Panel</p>
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        <div className="sm:w-80  px-3 sm:px-0 mx-auto">
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            className="mb-3 py-2 w-full"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            className="mb-3 py-2 w-full"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <div className="flex flex-col sm:flex-row  items-center justify-between mb-3">
            <Checkbox className="text-white">Remember Me</Checkbox>
            <Link href="/ForgotPassword" className="text-blue-400 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button type="primary" className="bg-[#0E5DCB]" onClick={handleLogin} block>
            Login
          </Button>
          <p className="text-white mt-4">
            Don't have an account? <Link href="/signUp" className="text-blue-400 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
