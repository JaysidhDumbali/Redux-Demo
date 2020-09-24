import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsandUsers } from "../actions/index";
import Highlighter from "react-highlight-words"; //npm install --save react-highlight-words
import { Table, Input, Button, Space, Spin, Skeleton } from "antd"; //npm install --save antd
import { SearchOutlined } from "@ant-design/icons"; //npm install --save @ant-design/icons

const PostList = () => {
  const [loading, setLoading] = useState(false); //For loading
  const [searchText, setSearchText] = useState(""); // For adding search capabilities
  const [searchedColumn, setSearchedColumn] = useState(""); // For adding search capabilities
  var searchInput = useRef(); // For adding search capabilities

  // For customer loading spinner
  const tableLoading = {
    spinning: loading,
    indicator: <Spin size="large" />,
  };

  //For API calling in beginning. Similar to componentDidMount method
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchPostsandUsers()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  //Getting data out of redux store
  const data = useSelector((state) => state.posts);
  const userState = useSelector((state) => state.user);

  //For getting user name from a different API
  const getUser = (id) => {
    const currentUser = userState.find((user) => user.id === id);
    if (!currentUser) {
      return <Skeleton active />;
    }
    return currentUser.name;
  };

  //Initially data woulb be []. SInce this the default state of data.
  //Hence check if data is present first
  if (data) {
    // Actual data of the table
    var renderedPosts = data.map((post) => {
      return {
        key: post.id,
        id: post.id,
        title: post.title,
        body: post.body,
        userData: getUser(post.userId),
      };
    });
  }

  //For adding search capabilites
  // >>>BEGIN<<<
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  //>>>END SEARCH CAPABILITIES<<<

  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      sorter: (a, b) => a.body.length - b.body.length,
      ...getColumnSearchProps("title"), // For adding search capabilities
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      ellipsis: true,
      ...getColumnSearchProps("id"), // For adding search capabilities
    },
    {
      title: "userData",
      dataIndex: "userData",
      key: "userData",
      sorter: (a, b) => {
        if (a !== null && b !== null) {
          return a.userData.length - b.userData.length;
        } // For making sure that the value is not none. Or else it will failing when the request is loading
      },
      ellipsis: true,
      ...getColumnSearchProps("userData"), // For adding search capabilities
    },
    {
      title: "body",
      dataIndex: "body",
      key: "body",
      sorter: (a, b) => a.body.length - b.body.length,
      ellipsis: true,
      ...getColumnSearchProps("body"), // For adding search capabilities
    },
  ];

  return (
    //Will create actual table
    <div>
      <Table
        loading={tableLoading}
        dataSource={renderedPosts}
        columns={columns}
        bordered={true}
        pagination={true}
      />
    </div>
  );
};

export default PostList;
