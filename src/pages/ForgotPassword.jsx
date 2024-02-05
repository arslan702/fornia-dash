import React, { useState } from "react";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from 'next/link';
import Image from 'next/image';
import { message } from "antd";
import { useRouter } from "next/router";
import { auth } from '@/config/firebase/';
import cookie from "js-cookie";
import Loader from "@/components/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from 'firebase/auth';


const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: ""
  });

  const handleLogin = async () => {
   
    try {


        await sendPasswordResetEmail(auth, loginData.email)
        message.success("Check your Gmail")

        // setTimeout(() => {
        //     router.push("/login");
        // }, 3000); // 3000 milliseconds = 3 seconds
    }
    catch (err) {
        message.error("Error")
        console.log(err)
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
        <div className="relative w-full h-[70px] sm:w-100 sm:h-[100px]">
          <Image src="/aiWorkLogo.png" fill objectFit="contain" />
        </div>
        <p className="text-white text-xl tracking-wide mb-3 fontNew">Admin Panel</p>
        <h2 className="text-2xl font-bold text-white mb-4">Forgot Password?</h2>
        <div className="sm:w-80  px-3 sm:px-0 mx-auto">
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            className="mb-3 py-2 w-full"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <p className="text-blue-100 text-sm "> After submitting email, check your <span className="text-red-400">Google Account.</span></p>
          <Button type="primary" className="bg-[#0E5DCB]" onClick={handleLogin} block>
            Submit
          </Button>
          <p className="text-white mt-4">
             If you have reset password,Go back to :? <Link href="/" className="text-blue-400 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
