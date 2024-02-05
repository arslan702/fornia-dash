import Head from "next/head";
import Image from "next/image";
import { FilterOutlined, SortAscendingOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { Select, Menu, Dropdown, Button, Table, Card, Modal, message } from "antd";
import { useState, useEffect } from "react";
import moment from 'moment';
import { db } from "@/config/firebase"
import { onSnapshot } from 'firebase/firestore';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ModifyToolModal from '../../components/ModifyToolModal'
const Index = ({filterValue}) => {

  const [tools, setTools] = useState(null)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tools"), (querySnapshot) => {
      const toolList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTools(toolList);
    });

    return () => unsubscribe(); // Unsubscribe when component is unmounted
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tools"), (querySnapshot) => {
      const toolList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Apply filtering logic only if filterValue is provided
      if (filterValue) {
        const filteredTools = toolList.filter(
          (tool) =>
            tool.category.toLowerCase().includes(filterValue.toLowerCase()) ||
            tool.subCategory.toLowerCase().includes(filterValue.toLowerCase())
        );
  
        setTools(filteredTools);
      } else {
        setTools(toolList); // If filterValue is empty, show all tools
      }
    });
  
    return () => unsubscribe(); // Unsubscribe when component is unmounted
  }, [filterValue]);// Listen for changes in filterValue



  const columns = [
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          #
        </div>
      ),
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1
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
          <div className="w-12 h-12 flex justify-center items-center m-1 ml-0">


            <img src={record?.imageUrl} className="" alt="image" />
          </div>
          {/* <Image src={record.toolImg} alt="Tool Image" width={30} height={30} className="mr-2" /> */}
          <span>{record.title}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          User
        </div>
      ),
      render: (text, record) => (
        <div className="flex items-center">
          {/* <Image src={record.toolImg} alt="Tool Image" width={30} height={30} className="mr-2" /> */}
          <span>{record.user}</span>
        </div>
      ),
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
          Subcategory
        </div>
      ),
      dataIndex: "subCategory",
      key: "subCategory",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Added Date
        </div>
      ),
      render: (text, record) => {
        let sec = record.joiningDate.seconds * 1000; // Convert to milliseconds
        let normalDate = new Date(sec).toLocaleDateString('en-GB', { timeZone: 'UTC' });
        return (
          <div className="flex items-center">
            <span>{normalDate}</span>
          </div>
        )
      },
      key: "addedDate",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Favourite
        </div>
      ),
      render: (text, record) => (
        <div className="flex items-center">
          {/* <Image src={record.toolImg} alt="Tool Image" width={30} height={30} className="mr-2" /> */}
          <span>{0}</span>
        </div>
      ),
      key: "Favourite",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Mode
        </div>
      ),
      dataIndex: "mode",
      key: "mode",
    },
    // {
    //   title: (
    //     <div className="text-[16px] text-[#777777] font-[500] fontItems">
    //       Details
    //     </div>
    //   ),
    //   key: "details",
    //   render: () => (
    //     <div className="flex justify-center">
    //       <Button className="bg-[#EFF3FF] border border-[#162D8014] py-0" icon={<EyeOutlined />} />
    //     </div>
    //   ),
    // },
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
        {/* <Image src={toolImg} alt="Tool Image" width={60} height={60} className="mr-4" /> */}
        <span className="sm:text-[24px] text-[20px]">{tooltitle}</span>
      </div>
      <Button icon={<EyeOutlined />} />
    </div>
  );

  const renderCards = () => {
    return tools && tools.map((item) => (
      <Card key={item.id} className="my-6" title={<CardHeader toolImg={item.toolImg} tooltitle={item.tooltitle} />} bordered={false}>
        <div className="mb-2 sm:text-[18px] text-[15px]">
          <p>User: {item.user}</p>
          <p>Category: {item.category}</p>
        </div>
        <div className=" mb-2 sm:text-[18px] text-[15px]">
          <p>Added Date: {item.joiningDate[0]}</p>
          <p>Favourite: {0}</p>
        </div>

        <div className="w-full flex justify-end">
          <div className={`text-white sm:text-[18px] text-[15px] w-20 px-[1rem] py-2 rounded-md flex items-center justify-center p-1 ${item.Mode === "Premium" ? "bg-blue-500" : "bg-yellow-500"} `}>
            {item.mode === "Premium" ? "Premium " : "Free"}
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

              {/* <Dropdown overlay={filterMenu} className="dropdown w-full sm:w-auto py-6 bg-[#15CADF0A]">
                <Button className="flex items-center">
                  <Image src="/imgs/filter.svg" height={15} width={15} className="mr-3" />
                  <p className="text-[16px] font-[400]">Filter By {selectedFilter}</p>
                  <Image src="/imgs/drop.svg" height={10} width={10} className="ml-3" />
                </Button>

              </Dropdown> */}
            </div>
            <div className="flex items-center w-full md:w-auto mt-3 md:mt-0 px-5 sm:px-0">

              {/* <Dropdown overlay={sortMenu} className="dropdown w-full sm:w-auto py-6 bg-[#15CADF0A]">
                <Button className="flex items-center">
                  <Image src="/imgs/sort.svg" height={18} width={18} className="mr-3" />
                  <p className="text-[16px] font-[400]">Sort By </p>
                  <Image src="/imgs/drop.svg" height={10} width={10} className="ml-3" />
                </Button>
              </Dropdown> */}
            </div>
          </div>

          <div className="px-4 hidden md:block">
            <Table dataSource={tools} columns={columns} className='table-responsive' pagination={false} />
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
