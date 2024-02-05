
import Sidebar from "./Sidebar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from 'react'
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image"
import authApi from "@/lib/authApi";
import { Avatar, Button, Dropdown, Input, Layout, Spin } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
import { Menu } from "antd";
import routes from "@/routes/routes";
import { HomeOutlined, AppstoreOutlined, UsergroupAddOutlined, CloudUploadOutlined, StarOutlined, MenuOutlined, CommentOutlined } from "@ant-design/icons";

const Index = ({ children, setVal }) => {
  const router = useRouter();


  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
  };
  const handleLogout = () => {

    setTimeout(() => {
      router.push("/");

    }, 1000);

  };




  const items = [
    {
      key: "2",
      label: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            className="text-sm md:text-lg font-medium font-poppins"
            style={{ textTransform: "capitalize", color: "#F49342" }}
          >
            {/* {data?.name} */}
            John Doe
          </span>
          <span
            className="text-black opacity-50 text-xs md:text-sm font-normal font-poppins"
            style={{ textTransform: "capitalize", opacity: "60" }}
          >
            {/* {data?.role} */}
            Admin
          </span>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <span
          className="text-red-600 opacity-50 text-xs md:text-base font-normal font-poppins"
          style={{ color: "red" }}
          onClick={handleLogout}
        >
          Logout
        </span>
      ),
    },
  ];


  const getPageTitle = (path) => {
    let route = routes.find((r) => r.path === path);
    if (route) {
      if (path === "/") {
        route = routes.find((r) => r.path === "/")
        return route.title
      }
      else if (path == "/managingTools") {
        const title = "Manage Tools";
        return title;
      }
    }
    return route ? route.title : "";
  }
  const navItemMenu = (
    <Menu className="custom-dropdown-menu" selectedKeys={[router.pathname]}>
      <Menu.Item key="/toolList" icon={<HomeOutlined />}>
        <Link href="/toolList">Tool List</Link>
      </Menu.Item>
      <Menu.Item key="/managingTools" icon={<AppstoreOutlined />}>
        <Link href="/managingTools">Managing Tools</Link>
      </Menu.Item>
      <Menu.Item key="/manageUsers" icon={<UsergroupAddOutlined />}>
        <Link href="/manageUsers">Manage Users</Link>
      </Menu.Item>
      <Menu.Item key="/uploadNews" icon={<CloudUploadOutlined />}>
        <Link href="/uploadNews">Upload News</Link>
      </Menu.Item>
      <Menu.Item key="/featureTools" icon={<StarOutlined />}>
        <Link href="/featureTools">Feature Tools</Link>
      </Menu.Item>
      <Menu.Item key="/adminProfile" icon={<UserOutlined />}>
        <Link href="/adminProfile">Admin Profile</Link>
      </Menu.Item>
      <Menu.Item key="/ratings" icon={<CommentOutlined />}>
        <Link href="/ratings">Rating & Reviews</Link>
      </Menu.Item>
    </Menu>
  );

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setVal(value)
  }

  return (
    <Layout style={{ minHeight: "100vh", paddingRight: 0 }} className="">
      <Sidebar role={"admin"} />
      <Layout className="site-layout ">
        <Header
          className=" bg-[#FFFFFF] border topRow  flex items-center justify-between w-full "
          style={{ paddingTop: 20, paddingBottom: 20, height: "4rem", borderColor: "#D9E9FF" }}
        >

          <div className="flex items-center justify-start    ">
            <div className="w-full  ">
              <h1 className="font-[700] sm:text-[24px] text-[20px] fontItems"> {getPageTitle(router.pathname)}</h1>
            </div>
            <div className=" responsive-input px-4 w-full  ">
              <Input


                onChange={handleSearch}
                placeholder="Search by Category or Subcateogry"
                className="border input-search fontNew rounded-full    px-4 py-2  sm:mx-auto text-sm md:text-base focus:outline-none focus:border-blue-500  " style={{ background: "#EAF0FF42", borderColor: "#07174F0A", }}
                suffix={<SearchOutlined style={{ color: "#777777", borderColor: "#07174F0A", background: "transparent" }} />}
              />
            </div>

          </div>




          <div className="flex items-center">


            {/* Bell Icon with Notification Count */}
            {/* <div className="relative mr-4" >
            <BellOutlined style={{ fontSize: "24px", color: "rgba(0, 0, 0, 0.65)", }} />
            <span className="notification-circle">{" "}</span>

          </div> */}



            {/* Avatar */}
            <div className="mx-4">
              <Dropdown menu={{ items }} placement="bottomRight">
                <Image src="/imgs/adminProfile.svg" height={40} width={40} alt="Profile" />
              </Dropdown>
            </div>
            <div className="md:hidden mt-3 flex items-center justify-between bg-[#FFFFFF] rounded-md shadow-md p-4 mx-4">

              <div>
                <Dropdown overlay={navItemMenu} trigger={["click"]}  >
                  <a className="text-[#0852C1]">
                    <MenuOutlined style={{ fontSize: "24px" }} />
                  </a>
                </Dropdown>
              </div>

            </div>
          </div>
        </Header>

        <Content style={{ paddingRight: 0 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Index;
