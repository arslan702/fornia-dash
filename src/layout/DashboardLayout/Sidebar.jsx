import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import routes from "@/routes/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const { Sider } = Layout;

const Sidebar = ({ role }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (router.pathname) {
      if (current !== router.pathname) {
        setCurrent(router.pathname);
      }
    }
  }, [router, current]);

  useEffect(() => {
    const handleWindowResize = () => {
      setCollapsed(window.innerWidth < 768); // Collapse sidebar on smaller devices (breakpoint: 768px)
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize(); // Initial check on component mount

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Sider
      style={{ paddingTop: "1rem", background: "#042757" }}
      className="hidden md:block "
      width={240}
    >
      <div className="flex items-center justify-center">
        <h1 className="text-white fontNew text-[24px]">AI Tool Directory</h1>
      </div>
      <Menu
        style={{
          marginTop: "1rem",
        }}
        className="sidebar"
        
        defaultSelectedKeys={[current]}
        onClick={({ key }) => {
          setCurrent(key);
        }}
        mode="inline"
        items={routes.map((route) => {
          if (route.roles.includes(role)) {
            return {
              key: route.path,
              icon: route.icon,
              label:
                route?.childrens?.length > 0 ? (
                  <button
                    href={route.path}
                    className="font-normal text-base font-poppins text-white fontItems"
                  >
                    {route.title}
                  </button>
                ) : (
                  <Link
                    href={route.path}
                    className="font-normal text-base font-poppins text-white fontItems"
                  >
                    {route.title}
                  </Link>
                ),
              children: route?.childrens?.map((child) => {
                if (child.roles.includes(role)) {
                  return {
                    key: child.path,
                    icon: child.icon,
                    label: (
                      <Link
                        href={child.path}
                        className="font-normal text-base font-poppins text-white fontItems"
                      >
                        {child.title}
                      </Link>
                    ),
                  };
                }
              }),
            };
          }
        })}
      />
        <div
        style={{
          position: "absolute",
          bottom: "4rem",
          left: "40%",
          transform: "translateX(-50%)",
          fontWeight: "bold",
          fontSize: "14px",
          color: "white"
          
        }}
      >
        Design & Developed by <Link style={{color: "#0852C1"}} href="/">ZySoftec</Link>
      </div>
    </Sider>
  );
};

export default Sidebar;
