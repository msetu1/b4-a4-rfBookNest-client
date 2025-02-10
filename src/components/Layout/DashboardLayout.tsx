import {
    MdAddChart,
    MdDashboard,
    MdManageHistory,
    MdOutlineProductionQuantityLimits,
  } from "react-icons/md";
  import { GiSplitCross } from "react-icons/gi";
  import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
  import React, { useState } from "react";
  import { Button, Layout, Menu, theme } from "antd";
  import { NavLink, Outlet } from "react-router-dom";
  import { useAppSelector } from "../../redux/hooks";
  import { FaJediOrder, FaUserCog } from "react-icons/fa";
  import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";
import { CgProfile } from "react-icons/cg";

  
  const { Header, Content, Sider } = Layout;
  
  const userRole = {
    ADMIN: "admin",
    USER: "user",
  };
  const DashboardLayout: React.FC = () => {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  
    const user = useAppSelector(useCurrentUser);
    let sidebarItems;
  
    switch (user!.role) {
      case userRole.USER:
        sidebarItems = [
          {
            key: "/",
            icon: '',
            label: <NavLink to={"/"}><h2 className="text-3xl font-bold text-[#6a00f4] font-lobster mt-4 ">
            rfBook<span className="text-purple-500">Nest</span>
          </h2></NavLink>,
          },
          {
            key: "UserDashboard",
            icon: <MdDashboard />,
            label: <NavLink to={"/user/dashboard"}>Dashboard</NavLink>,
          },
          
          {
            key: "view-order-history",
            icon: <FaMoneyCheckDollar />,
            label: (
              <NavLink to={"/user/dashboard/view-order-history"}>
                View order history
              </NavLink>
            ),
          },
          {
            key: "user-profile",
            icon: <CgProfile />,
            label: (
              <NavLink to={"/user/dashboard/user-profile"}>
                Profile
              </NavLink>
            ),
          },
        ];
        break;
      case userRole.ADMIN:
        sidebarItems = [
          {
            key: "AdminDashboard",
            icon: <MdDashboard />,
            label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
          },
          {
            key: "ProductManagement",
            icon: <MdOutlineProductionQuantityLimits />,
            label: "Product Management",
            children: [
              {
                key: "AddProduct",
                icon: <MdAddChart />,
                label: (
                  <NavLink to={"/admin/dashboard/add-product"}>
                    Add Product
                  </NavLink>
                ),
              },
              {
                key: "ManageProduct",
                icon: <MdManageHistory />,
  
                label: (
                  <NavLink to={"/admin/dashboard/manage-product"}>
                    Manage Product
                  </NavLink>
                ),
              },
              {
                key: "ManagingOrders",
                icon: <FaJediOrder />,
                label: (
                  <NavLink to={"/admin/dashboard/managing-orders"}>
                    Managing Orders
                  </NavLink>
                ),
              },
            ],
          },
          {
            key: "UserManagement",
            icon: <FaUserCog />,
            label: "User Management",
            children: [
              {
                key: "DeactivatingAccounts",
                icon: <GiSplitCross />,
                label: (
                  <NavLink to={"/admin/dashboard/deactivating-accounts"}>
                    Deactivating Accounts
                  </NavLink>
                ),
              },
            ],
          },
        ];
        break;
  
      default:
        break;
    }
    const [collapsed, setCollapsed] = useState(false);
  
    return (
      <Layout>
        <Sider
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={sidebarItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, position: "sticky", top: 0, zIndex: 1000 }}
            className="bg-gradient-to-r from-[#1B1B31] via-purple-500 to-[#1B1B31] min-w-f"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "white",
              }}
            />
          </Header>
          <Content>
            <div
              style={{
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default DashboardLayout;