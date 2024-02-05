
import Head from "next/head";
import Image from "next/image";
import { FilterOutlined, SortAscendingOutlined, EyeOutlined  } from "@ant-design/icons";
import { Select, Menu, Dropdown, Button, Table, Card } from "antd";
import { useState, useEffect } from "react";
const Index = () => {


  const data = [
    {
      id: "1",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool1.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "2",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool2.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "3",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool3.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "4",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool4.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "5",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool2.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "6",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool1.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "7",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool4.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "8",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool2.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "9",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool2.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    },
    {
      id: "10",
      tooltitle: "Writesonic",
      toolImg: "/imgs/toolList/tool1.svg",
      user: "James William",
      category: "Text",
      addedDate: "12 Aug 2023",
      Favourite: 120,
      Mode: "Premium",
    }
  ];

  const columns = [
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          #
        </div>
      ),
      dataIndex: "id",
      key: "id",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Tool
        </div>
      ),
      key: "tooltitle",
      render: (text, record) => (
        <div className="flex items-center">
          <Image src={record.toolImg} alt="Tool Image" width={30} height={30} className="mr-2" />
          <span>{record.tooltitle}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          User
        </div>
      ),
      dataIndex: "user",
      key: "user",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Category
        </div>
      ),
      dataIndex: "category",
      key: "category",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Added Date
        </div>
      ),
      dataIndex: "addedDate",
      key: "addedDate",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Favourite
        </div>
      ),
      dataIndex: "Favourite",
      key: "Favourite",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Mode
        </div>
      ),
      dataIndex: "Mode",
      key: "Mode",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Details
        </div>
      ),
      key: "details",
      render: () => (
        <div className="flex justify-center">
        <Button className="bg-[#EFF3FF] border border-[#162D8014] py-0" icon={<EyeOutlined />} />
        </div>
      ),
    },
  ];

  

  // Define options for the Filter By dropdown
  const filterOptions = [
    { label: "Category", value: "category" },
    { label: "Status", value: "status" },
    // ... add more options as needed
  ];

  // Define options for the Sort By dropdown
  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Date", value: "date" },
    // ... add more options as needed
  ];

  // State for selected filter and sort options
  const [selectedFilter, setSelectedFilter] = useState("Category");
  const [selectedSort, setSelectedSort] = useState("name");

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  // Define the Filter By dropdown menu
  const filterMenu = (
    <Menu>
      {filterOptions.map((option) => (
        <Menu.Item key={option.value}>
          <span>{option.label}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  // Define the Sort By dropdown menu
  const sortMenu = (
    <Menu>
      {sortOptions.map((option) => (
        <Menu.Item key={option.value}>
          <span>{option.label}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const CardHeader = ({ toolImg, tooltitle }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image src={toolImg} alt="Tool Image" width={60} height={60} className="mr-4" />
        <span className="sm:text-[24px] text-[20px]">{tooltitle}</span>
      </div>
      <Button icon={<EyeOutlined />} />
    </div>
  );

  const renderCards = () => {
    return data.map((item) => (
      <Card key={item.id} className="my-6" title={<CardHeader toolImg={item.toolImg} tooltitle={item.tooltitle} />} bordered={false}>
        <div className="mb-2 sm:text-[18px] text-[15px]">
          <p>User: {item.user}</p>
          <p>Category: {item.category}</p>
        </div>
        <div className=" mb-2 sm:text-[18px] text-[15px]">
          <p>Added Date: {item.addedDate}</p>
          <p>Favourite: {item.Favourite}</p>
        </div>

        <div className="w-full flex justify-end">
        <div className={`text-white sm:text-[18px] text-[15px] w-20 px-[1rem] py-2 rounded-md flex items-center justify-center p-1 ${item.Mode === "Premium" ? "bg-blue-500" : "bg-yellow-500"} `}>
            {item.Mode === "Premium" ? "Premium " : "Free"}
          </div>
   
        </div>
        
        
      </Card>
    ));
  };

  return (
    <>
      <Head>
        <title>Tool List</title>
      </Head>
      <div className="h-full w-full py-6 sm:px-5 bg-[#F3F8FF] ">
        <div className="w-full h-full flex flex-col rounded-lg bg-white py-4 sm:px-5">
          <div className="flex justify-between items-center mb-4 flex-wrap">
            <div className="flex items-center w-full md:w-auto px-5 sm:px-0">
              
              <Dropdown overlay={filterMenu} className="dropdown w-full lg:w-auto py-6 bg-[#15CADF0A]">
                <Button className="flex items-center"> 
                  <Image src="/imgs/filter.svg" height={15} width={15} className="mr-3"/>
                  <p className="text-[16px] font-[400]">Filter By {selectedFilter}</p>
                  <Image src="/imgs/drop.svg" height={10} width={10} className="ml-3"/>
                  </Button>
                  
              </Dropdown>
            </div>
            <div className="flex items-center w-full md:w-auto mt-3 md:mt-0 px-5 sm:px-0">
          
              <Dropdown overlay={sortMenu} className="dropdown w-full lg:w-auto py-6 bg-[#15CADF0A]">
              <Button className="flex items-center"> 
                  <Image src="/imgs/sort.svg" height={18} width={18} className="mr-3"/>
                  <p className="text-[16px] font-[400]">Sort By</p>
                  <Image src="/imgs/drop.svg" height={10} width={10} className="ml-3"/>
                  </Button>
              </Dropdown>
            </div>
          </div>

          <div className="px-4 hidden md:block">
          <Table dataSource={data} columns={columns} className='table-responsive' pagination={false} />
          </div>

          <div className="px-4 flex flex-col md:hidden">
          {renderCards()}
          </div>

     
        </div>
      </div>
    </>
  );
};

export default Index;
