
import Head from "next/head";
import Image from "next/image";
import { FilterOutlined, SortAscendingOutlined, EyeOutlined, MoreOutlined   } from "@ant-design/icons";
import { Select, Menu, Dropdown, Button, Table, Card, Modal, Checkbox, Pagination } from "antd";
import { getDocs,collection,doc ,deleteDoc,onSnapshot , docs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useState, useEffect } from "react";
import { message } from 'antd';
import moment from 'moment';
import ModifyUserModal from '../../components/ModifyUserModal'

const Index = () => {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null)

  const handleEditModalToggle = (tool) => {
    setSelectedTool(tool);
    if (tool) {
      const editedTool = {
        ...tool,
        joiningDate: moment(tool.joiningDate, 'DD MMM YYYY')
      };
      setSelectedTool(editedTool);
    } else {
      setSelectedTool(null);
    }
    setEditModalVisible(!editModalVisible);
    
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contact"), (querySnapshot) => {
      const toolList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContact(toolList);
    });

    return () => unsubscribe(); // Unsubscribe when component is unmounted
  }, []);
  const deleteTool = async (userId) => {
    try {
      const userRef = doc(db, 'contact', userId);
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

    const [contact,setContact]=useState(null)
    useEffect(() => {
      const fetchUsers = async () => {
        console.log("helloo")
        try {
          const querySnapshot = await getDocs(collection(db, "contact"));
          const toolList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContact(toolList);
        } catch (error) {
          console.error('Error fetching users:', error, " error end");
        }
      };
      fetchUsers();
    }, []);
    console.log("this")
console.log("this is contacts:",contact)
      

  const data = [
    {
      id: "1",
      img: "/imgs/user/user1.svg",
      user: "James William",
      category: "Text",
      joiningDate: "12 Aug 2023",
      lastActivity: "Issue with my account",
      Favourite: 120,
      Mode: "I cannot login. Help me",
    },
    {
        id: "2",
        img: "/imgs/user/user2.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
        Favourite: 120,
        Mode: "I cannot login. Help me",
      },
      {
        id: "3",
        img: "/imgs/user/user2.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
      Favourite: 120,
      Mode: "I cannot login. Help me",
      },
      {
        id: "4",
        img: "/imgs/user/user3.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
        Favourite: 120,
        Mode: "I cannot login. Help me",
      },
      {
        id: "5",
        img: "/imgs/user/user4.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
        Favourite: 120,
        Mode: "I cannot login. Help me",
      },
      {
        id: "6",
        img: "/imgs/user/user1.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
      Favourite: 120,
      Mode: "I cannot login. Help me",
      },
      {
        id: "7",
        img: "/imgs/user/user2.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
        Favourite: 120,
        Mode: "I cannot login. Help me",
      },
      {
        id: "8",
        img: "/imgs/user/user3.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
      Favourite: 120,
      Mode: "I cannot login. Help me",
      },
      {
        id: "9",
        img: "/imgs/user/user4.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
        Favourite: 120,
        Mode: "I cannot login. Help me",
      },
      {
        id: "10",
        img: "/imgs/user/user1.svg",
        user: "James William",
        category: "Text",
        joiningDate: "12 Aug 2023",
        lastActivity: "Issue with my account",
        Favourite: 120,
        Mode: "I cannot login. Help me",
      },
  ];

  const customPagination = {
    showSizeChanger: false,
    pageSize: itemsPerPage,
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} results`,
    current: currentPage,
    onChange: (page) => {
      setCurrentPage(page);
    },
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const pageOptions = Array.from(
    { length: Math.ceil(data.length / itemsPerPage) },
    (_, i) => ({
      label: `Page ${i + 1}`,
      value: i + 1,
    })
  );

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
          User Name
        </div>
      ),
      key: "username",
      render: (text, record) => (
        <div className="flex items-center">
          {/* <Image src={record.img} alt="Tool Image" width={30} height={30} className="mr-2" /> */}
          <span>{record.username}</span>
        </div>
      ),
    },
    
   
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Date
        </div>
      ),
      dataIndex: "joiningDate",
      key: "joiningDate",
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
            Title
          </div>
        ),
        key: "lastActivity",
        render: (text, record) => (
          <div className="flex items-center">
            {/* <Image src={record.img} alt="Tool Image" width={30} height={30} className="mr-2" /> */}
            <span>{record.title}</span>
          </div>
        ),
      },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Description
        </div>
      ),
      dataIndex: "Mode",
      key: "Mode",
      render: (text, record) => (
        <div className="flex items-center">
          {/* <Image src={record.img} alt="Tool Image" width={30} height={30} className="mr-2" /> */}
          <span>{record.description}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-[16px] text-center text-[#777777] font-[500] fontItems">
          Actions
        </div>
      ),
      key: "details",
      render: (record) => (
        <div className="flex justify-center">
        <ActionsDropdown record={record}/>
        </div>
      ),
    },
  ];

  const selectRow = (record) => {
  
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    setSelectedRowKeys( selectedRowKeys );
  };

  const onSelectedRowKeysChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };


  



  const CardHeader = ({ toolImg, tooltitle }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image src={toolImg} alt="Tool Image" width={60} height={60} className="mr-4" />
        <span className="sm:text-[24px] text-[16px]">{tooltitle}</span>
      </div>
      <ActionsDropdown />
    </div>
  );

  const renderCards = () => {
    return data.map((item) => (
      <Card key={item.id} className="my-7" title={<CardHeader toolImg={item.img} tooltitle={item.user} />} bordered={false}>
        <div className="mb-2 sm:text-[18px] text-[13px]">
          <p>Joning Date: {item.joiningDate}</p>
          <p>Last Activity: {item.lastActivity}</p>
        </div>
        

        <div className="w-full flex justify-end">
        <div className={`text-white sm:text-[18px] text-[13px] w-20 px-[1rem] py-2 rounded-md flex items-center justify-center p-1 ${item.Mode === "Premium" ? "bg-blue-500" : "bg-yellow-500"} `}>
            {item.Mode === "Premium" ? "Premium " : "Free"}
          </div>
   
        </div>
        
        
      </Card>
    ));
  };

  const ActionsDropdown = ({record}) => (
    <Dropdown
      overlay={
        <Menu>
          {/* <Menu.Item key="edit" onClick={() => handleEditModalToggle(record)}>
            Edit
          </Menu.Item> */}
          <Menu.Item key="delete" onClick={() => handleDeleteModalToggle(record)}>
            Delete
          </Menu.Item>
        </Menu>
      }
    >
      <Button icon={<MoreOutlined  />} />
    </Dropdown>
  );

  


  return (
    <>
      <Head>
        <title>Manage Users</title>
      </Head>
      <div className="h-full w-full py-6 px-5 bg-[#F3F8FF] ">
        <div className="w-full h-full flex flex-col rounded-lg bg-white py-4 sm:px-5">
        
        <div className="hidden sm:flex items-center justify-between my-6 mx-4">
        <div>
          <Pagination {...customPagination} total={data.length}
            style={{ color: "#777777" }}
            selectComponentClass={Select}
            selectComponentOptions={{ options: pageOptions }} />
        </div>
        <div className="flex">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style={{display: "flex", alignItems: "center", marginRight:"10px"}}
          >
             <Image src="/imgs/prev.svg" height={5} width={5} className="mr-3"/>
            Prev
          </Button>
          <Button
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{display: "flex", alignItems: "center"}}
          >
            Next
            <Image src="/imgs/next.svg" height={5} width={5} className="ml-3"/>
          </Button>
        </div>
      </div>

          <div className="px-4 hidden md:block">
          <Table
  dataSource={contact && contact}
  columns={columns}
  className='table-responsive'
  pagination={false}
  onRow={(record) => ({
    onClick: () => {
      selectRow(record);
    },
    className: selectedRowKeys.includes(record.id) ? 'bg-[#e6f7ff]' : '',
  })}
/>
          </div>

          <div className=" flex flex-col md:hidden">
          {renderCards()}
          </div>

     
        </div>
      </div>

      <ModifyUserModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        data={selectedTool}
      />


      <Modal
    title="Delete User"
    visible={deleteModalVisible}
    onCancel={handleDeleteModalToggle}
    footer={[
      <Button key="cancel" onClick={handleDeleteModalToggle}>
        Cancel
      </Button>,
      <Button key="delete" type="danger" style={{background: "#F93C51", color:"white"}} onClick={handleDeleteUser}>
        Yes
      </Button>,
    ]}
  >
    Are you sure you want to delete this?
  </Modal>
    </>
  );
};

export default Index;
