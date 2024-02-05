
import Head from "next/head";
import Image from "next/image";
import { FilterOutlined, SortAscendingOutlined, EyeOutlined, MoreOutlined, StarRating, StarFilled } from "@ant-design/icons";
import { Select, Menu, Dropdown, Button, Table, Card, Modal, Checkbox, Pagination } from "antd";
import { useState, useEffect } from "react";
import { message } from 'antd';
import moment from 'moment';
import { db } from "@/config/firebase";
import { getDocs, collection, deleteDoc, docs, doc, onSnapshot } from "firebase/firestore";
import ModifyReviewModal from '../../components/ModifyReviewModal'
const Index = () => {

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null)

  const [reviews, setReviews] = useState(null)
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("helloo")
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const toolList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(toolList);
      } catch (error) {
        console.error('Error fetching users:', error, " error end");
      }
    };
    fetchUsers();
  }, []);
  console.log("this")

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (querySnapshot) => {
      const toolList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(toolList);
    });

    return () => unsubscribe(); // Unsubscribe when component is unmounted
  }, []);
  const deleteTool = async (userId) => {
    try {
      const userRef = doc(db, 'reviews', userId);
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

  const handleEditModalToggle = (tool) => {
    setSelectedTool(tool);
    if (tool) {
      const editedTool = {
        ...tool,
        date: moment(tool.date, 'DD MMM YYYY')
      };
      setSelectedTool(editedTool);
    } else {
      setSelectedTool(null);
    }
    setEditModalVisible(!editModalVisible);

  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page







  const data = [
    {
      id: "1",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "2",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "3",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "4",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "5",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "6",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "7",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "8",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "9",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
    {
      id: "10",
      img: "/imgs/user/user1.svg",
      user: "Gabriel Pires",
      review: "This is a great tool that helped me a lot in my work.",
      ratings: 4.5,
      time: "12:31 Pm",
      date: "23 Nov, 2023",
      toolImg: "/imgs/toolList/tool2.svg",
      tool: "Writesonic"
    },
  ];
  const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.min(Math.max(rating, 0), totalStars);

    return (
      <div className="flex">
        {[...Array(totalStars)].map((_, index) => (
          <StarFilled
            key={index}
            style={{ color: index < filledStars ? "#FFC107" : "#E0E0E0" }}
          />
        ))}
      </div>
    );
  };

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
  const selectRow = (record) => {

    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    setSelectedRowKeys(selectedRowKeys);
  };

  const onSelectedRowKeysChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };




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
      key: "tool",
      render: (text, record) => (
        <div className="flex items-center">
          <Image src={record.imageUrl} alt="Tool Image" width={30} height={30} className="mr-2" />
          <span>{record.tool}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Name
        </div>
      ),
      key: "tool",
      render: (text, record) => (
        <div className="flex items-center">
          {/* <Image src={record.imageUrl} alt="Tool Image" width={30} height={30} className="mr-2" /> */}
          <span>{record.name}</span>
        </div>
      ),
    },

    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Review
        </div>
      ),
      dataIndex: "review",
      key: "review",
      render: (text, review) => {
        const trimmedText = review.length > 50 ? review.substring(0, 50) + "..." : review.review;
        return (
          <div className="flex">
            {/* <Image src={review.imageUrl} alt="User Image" width={35} height={35} className="mr-2" /> */}
            <div className="flex flex-col justify-center">
              <div>
                <span className="font-[500]">{review.user}</span>
                <span className="text-[12px] text-[#777777] ml-2">{review.time}{","}{review.date}</span>
              </div>

              <span>{trimmedText}</span>
            </div>

          </div>
        );
      },
    },

    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Ratings
        </div>
      ),
      dataIndex: "ratings",
      key: "rating",
      render: (text, record) => (
        <div className="flex items-center">
          {/* <span className="mr-2 font-[600] text-[20px]">{record.ratings.toFixed(1)}</span> */}
          <StarRating rating={record.rating} />
        </div>
      ),
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
    //    <Button className=" py-0" icon={<EyeOutlined />} />
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="text-[16px] text-[#777777] font-[500] fontItems">
          Actions
        </div>
      ),
      key: "actions",
      render: (record) => (
        <div className="flex justify-center">
          <ActionsDropdown record={record} />
        </div>
      ),
    },
  ];





  const CardHeader = ({ img, user, time, date }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image src={img} alt="Tool Image" width={60} height={60} className="mr-4" />
        <div className="flex flex-col ">
          <span className="sm:text-[24px] text-[18px]">{user}</span>
          <span className="sm:text-[16px] text-[10px] text-[#777777]">{time}{","}{date}</span>
        </div>
      </div>
      <ActionsDropdown />
    </div>
  );
  const CardContent = ({ toolImg, toolTitle, review, ratings }) => (
    <div>
      <div className="mb-2 flex items-center">

        <Image src={toolImg} alt="Tool Image" width={30} height={30} className="mr-2" />
        <span className="sm:text-[24px] text-[20px]">{toolTitle}</span>
      </div>
      <div className="mb-2 sm:text-[24px] text-[20px]">{review}</div>
      <div className="flex items-center">
        <span className="mr-2 font-[600] text-[20px]">{ratings}</span>
        <StarRating rating={ratings} />
      </div>
      <div className="w-full flex justify-end">

        <Button className="py-0" icon={<EyeOutlined />} />
      </div>
    </div>
  );

  const renderCards = () => {
    return data.map((item) => (
      <Card
        key={item.id}
        className="my-7"
        title={
          <CardHeader
            img={item.img}
            user={item.user}
            time={item.time}
            date={item.date}
          />
        }
        bordered={false}
      >
        <CardContent toolImg={item.toolImg} toolTitle={item.tool} review={item.review} ratings={item.ratings} />
      </Card>
    ));
  };

  const ActionsDropdown = ({ record }) => (
    <Dropdown
      overlay={
        <Menu>
        
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
                style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
              >
                <Image src="/imgs/prev.svg" height={5} width={5} className="mr-3" />
                Prev
              </Button>
              <Button
                disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
                style={{ display: "flex", alignItems: "center" }}
              >
                Next
                <Image src="/imgs/next.svg" height={5} width={5} className="ml-3" />
              </Button>
            </div>
          </div>

          <div className="px-4 hidden md:block">
            <Table
              dataSource={reviews && reviews}
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

      <ModifyReviewModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(null)}
        data={selectedTool}
      />


      <Modal
        title="Delete Review"
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
        Are you sure you want to delete this Review?
      </Modal>
    </>
  );
};

export default Index;
