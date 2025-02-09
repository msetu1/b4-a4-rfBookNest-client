import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import AllProducts from "../pages/products/AllProducts";
import ProductDetails from "../pages/products/ProductDetails";
import Register from "../pages/Authentication/Register";
import ContactUs from "../components/Home/ContactUs";
import OurTeam from "../components/Home/OurTeam";
import Gallery from "../pages/Gallery/Gallery";
const router = createBrowserRouter([
        {
                path: "/",
                element: <MainLayout />,
                children: [
                  {
                    index: true,
                    element: <Home/>,
                  },
                  {
                    path: "/all-product",
                    element: <AllProducts />,
                  },
                  {
                    path: "/product-details/:id",
                    element: <ProductDetails />,
                  },
                  {
                    path: "/contact-us",
                    element: <ContactUs />,
                  },
                  {
                    path: "/meet-our-team",
                    element: <OurTeam/>,
                  },
                  {
                    path: "/gallery",
                    element: <Gallery/>,
                  },
                //   payment method implement 
                  
                ],
        },
        //       {
        //         path: "/admin/dashboard",
        //         element: (
        //           <AdminProtectedLayout>
        //             <Dashboard />
        //           </AdminProtectedLayout>
        //         ),
        //         children: [
        //           {
        //             index: true,
        //             element: <AdminDashboard />,
        //           },
        //           {
        //             path: "add-product",
        //             element: <AddProduct />,
        //           },
        //           {
        //             path: "manage-product",
        //             element: <ManageProduct />,
        //           },
        //           {
        //             path: "managing-orders",
        //             element: <ManagingOrders />,
        //           },
        //           {
        //             path: "deactivating-accounts",
        //             element: <DeactivatingAccounts />,
        //           },
        //           {
        //             path: "update-product/:id",
        //             element: <UpdateProduct />,
        //           },
        //         ],
        //       },
        //       {
        //         path: "/user/dashboard",
        //         element: (
        //           <UserProtectedLayout>
        //             <Dashboard />
        //           </UserProtectedLayout>
        //         ),
        //         children: [
        //           {
        //             index: true,
        //             element: <UserDashboard />,
        //           },
        //           {
        //             path: "view-order-history",
        //             element: <ViewUserOrderHistory />,
        //           },
        //         ],
        //       },


        // authentication 
        {
        path: "/login",
        element: <Login />,
        },
        {
        path: "/register",
        element: <Register />,
        }
]);
export default router;