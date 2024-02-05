import { PieChartOutlined, HomeFilled, SettingFilled } from "@ant-design/icons";
import Image from 'next/image'
import { UserOutlined } from "@ant-design/icons";

const routes = [
  {
    path: "/toolList",
    icon: <Image src="/imgs/toolList.svg" height={20} width={20} />,
    title: "Tool List",
    roles: ["admin", "user"],
  },

  {
    path: "/managingTools",
    icon: <Image src="/imgs/manage.svg" height={20} width={20} />,
    title: "Managing tools",
    roles: ["user", "admin"],
  },
  {
    path: "/manageUsers",
    icon: <Image src="/imgs/users.svg" height={20} width={20} />,
    title: "Manage Users",
    roles: ["user", "admin"],
  },
  {
    path: "/uploadNews",
    icon: <Image src="/imgs/upload.svg" height={20} width={20} />,
    title: "Upload News",
    roles: ["user", "admin"],
  },
  // {
  //   path: "/featureTools",
  //   icon: <Image src="/imgs/feature.svg" height={20} width={20} />,
  //   title: "Feature Tools",
  //   roles: ["user", "admin"],
  // },
   {
    path: "/contacts",
    icon: <Image src="/imgs/feature.svg" height={20} width={20} />,
    title: "Contacts",
    roles: ["user", "admin"],
  },
  {
    path: "/ratings",
    icon: <Image src="/imgs/rating.svg" height={20} width={20} />,
    title: "Rating $ Review ",
    roles: ["user", "admin"],
  },
  {
    path: "/adminProfile",
    icon: <Image src="/imgs/admin.svg" height={20} width={20} />,
    title: "Admin Profile",
    roles: ["user", "admin"],
  },

 
];

export default routes;
