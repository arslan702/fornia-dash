
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

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null)

  const [tools, setTool] = useState(null)


  const deleteTool = async (userId) => {
    try {
      const userRef = doc(db, 'tools', userId);
      await deleteDoc(userRef);
      message.success("Deleted Successfully");
    } catch (error) {
      message.error("Error deleting tool");
      console.error('Error deleting tool:', error);
    }
  };
  const handleDeleteUser = () => {

    if (selectedUserId) {
      console.log(selectedUserId)
      deleteTool(selectedUserId);
      setSelectedUserId(null); // Reset selected user after deletion
    }
    setDeleteModalVisible(false);

  }

  const handleDeleteModalToggle = (user) => {
    setDeleteModalVisible(!deleteModalVisible);
    console.log("selected Tool : ", selectedTool)
    console.log("UUUser", user.id)
    setSelectedUserId(user.id)
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tools"), (querySnapshot) => {
      const toolList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTool(toolList);
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
  
        setTool(filteredTools);
      } else {
        setTool(toolList); // If filterValue is empty, show all tools
      }
    });
  
    return () => unsubscribe(); // Unsubscribe when component is unmounted
  }, [filterValue]);
  console.log("all Users", tools)

  const handleEditModalToggle = (tool) => {
    setSelectedTool(tool);
    console.log("tuuuuuuuul::",tool)
    if (tool) {
      const editedTool = {
        ...tool,
        joiningDate: moment(tool.joiningDate, 'DD MMM YYYY')
      };
      console.log(editedTool)
      setSelectedTool(editedTool);
    } else {
      setSelectedTool(null);
    }
    setEditModalVisible(!editModalVisible);

  };



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
      type: "Featured",
      color: "#F7B614"
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
      type: "Trending",
      color: "#042552"
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
      type: "Trending",
      color: "#042552"
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
      type: "Alternative",
      color: "#15cadf"
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
      type: "Featured",
      color: "#F7B614"
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
      type: "Featured",
      color: "#F7B614"
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
      type: "Featured",
      color: "#F7B614"
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
      type: "Featured",
      color: "#F7B614"
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
      type: "Featured",
      color: "#F7B614"
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
      type: "Featured",
      color: "#F7B614"
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
          <span>{record?.title}</span>
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
      render: (text, record) => {
        let sec = record.joiningDate.seconds * 1000; // Convert to milliseconds
        let normalDate = new Date(sec).toLocaleDateString('en-GB', { timeZone: 'UTC' });
        return (
          <div className="flex items-center">
            <span>{normalDate}</span>
          </div>
        )
      },
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Favourite
        </div>
      ),
      render: (record) => (
        <div className="flex justify-start">
          <div className={`bg-[${record?.color}] p-2`} style={{ borderRadius: "5px" }}>
            {0}
          </div>
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
      render: (record) => (
        <div className="flex justify-start">
          <div className={`bg-[${record?.color}] p-2`} style={{ borderRadius: "5px" }}>
            {record?.mode}
          </div>
        </div>
      ),
      key: "Mode",
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Type
        </div>
      ),
      render: (record) => (
        <div className="flex justify-start">
          <div className={`bg-[${record?.color}] p-2`} style={{ borderRadius: "5px" }}>
            {record?.type}
          </div>
        </div>
      ),
      key: "Type",
    },
    {
      title: (
        <div className="text-[16px] text-center text-[#777777] font-[500] fontItems">
          Action
        </div>
      ),
      key: "action",
      render: (record) => (
        <div className="flex justify-center">
          <ActionsDropdown record={record} />
        </div>
      ),
    },
  ];



  // Define options for the Filter By dropdown
  const filterOptions = [
    { label: "Category", value: "Category" },
    { label: "Status", value: "Status" },
    // ... add more options as needed
  ];


  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Date", value: "date" },

  ];


  const [selectedFilter, setSelectedFilter] = useState("Category");
  const [selectedSort, setSelectedSort] = useState("name");

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

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
      <ActionsDropdown />
    </div>
  );

  const renderCards = () => {
    return data&&data.map((item) => (
      <Card key={item.id} className="my-8" title={<CardHeader toolImg={item.toolImg} tooltitle={item.tooltitle} />} bordered={false}>
        <div className="mb-2 sm:text-[18px] text-[15px]">
          <p>User: {item.user}</p>
          <p>Category: {item.category}</p>
        </div>
        <div className=" mb-2 sm:text-[18px] text-[13px]">
          <p>Added Date: {item.addedDate}</p>
          <p>Favourite: {item.Favourite}</p>
        </div>

        <div className="w-full flex justify-end">
          <div className={`text-white sm:text-[18px] text-[13px] w-20 px-[1rem] py-2 rounded-md flex items-center justify-center p-1 ${item.Mode === "Premium" ? "bg-blue-500" : "bg-yellow-500"} `}>
            {item.Mode === "Premium" ? "Premium " : "Free"}
          </div>

        </div>


      </Card>
    ));
  };

  const ActionsDropdown = ({ record }) => (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit" onClick={() => handleEditModalToggle(record)}>
            Edit
          </Menu.Item>
          <Menu.Item key="delete" onClick={() => handleDeleteModalToggle(record)}>
            Delete
          </Menu.Item>
        </Menu>
      }
    >
      <Button icon={<MoreOutlined />} />
    </Dropdown>
  );




  return (
    <>
      <Head>
        <title>Manage Tools</title>
      </Head>
      <div className="h-full w-full py-6 sm:px-5 bg-[#F3F8FF] ">
        <div className="w-full h-full flex flex-col rounded-lg bg-white py-4 sm:px-5">
          <div className="flex justify-between items-center mb-4 flex-wrap">
            {/* <div className="flex items-center w-full md:w-auto px-5 sm:px-0">

              <Dropdown overlay={filterMenu} className="dropdown w-full lg:w-auto py-6 bg-[#15CADF0A]">
                <Button className="flex items-center">
                  <Image src="/imgs/filter.svg" height={15} width={15} className="mr-3" />
                  <p className="text-[16px] font-[400]">Filter By {selectedFilter}</p>
                  <Image src="/imgs/drop.svg" height={10} width={10} className="ml-3" />
                </Button>

              </Dropdown>
            </div> */}
            <div className="flex items-center w-full md:w-auto mt-3 md:mt-0 px-5 sm:px-0">

              {/* <Dropdown overlay={sortMenu} className="dropdown w-full lg:w-auto py-6 bg-[#15CADF0A]">
                <Button className="flex items-center">
                  <Image src="/imgs/sort.svg" height={18} width={18} className="mr-3" />
                  <p className="text-[16px] font-[400]">Sort By</p>
                  <Image src="/imgs/drop.svg" height={10} width={10} className="ml-3" />
                </Button>
              </Dropdown> */}
            </div>
          </div>

          <div className="px-4 hidden md:block">
            <Table dataSource={tools} columns={columns} className='table-responsive' pagination={false} />
          </div>

          <div className=" flex flex-col md:hidden">
            {renderCards()}
          </div>


        </div>
      </div>

      <ModifyToolModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(null)}
        data={selectedTool}
      />


      <Modal
        title="Delete Tool"
        visible={deleteModalVisible}
        onCancel={handleDeleteModalToggle}
        footer={[
          <Button key="cancel" onClick={handleDeleteModalToggle}>
            Cancel
          </Button>,
          <Button key="delete" type="danger" style={{ background: "#F93C51", color: "white" }} onClick={handleDeleteUser}>
            Yes
          </Button>,
        ]}
      >
        Are you sure you want to delete this tool?
      </Modal>
    </>
  );
};

export default Index;
