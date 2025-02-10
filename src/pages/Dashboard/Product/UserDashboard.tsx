import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// import { RingLoader } from "react-spinners";
// import { TOrder } from "../../../types/TOrder";
import { logout, useCurrentUser } from "../../../redux/feature/auth/authSlice";
import GradientBackground from "../../../UI/GradientBackground";
import HomeGradient from "../../../UI/HomeGradient";
// import { useGetUserOrdersDataQuery } from "../../../redux/feature/order/orderApi";

const UserDashboard = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };

  //   console.log(usersData);

  // const { data, isLoading } = useGetUserOrdersDataQuery(user?.email, {
  //   refetchOnFocus: true,
  //   refetchOnMountOrArgChange: true,
  //   refetchOnReconnect: true,
  //   // pollingInterval: 30000,
  // });
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
//         <RingLoader size={80} color="#1ca944" />
//       </div>
//     );
//   }

//   const orderData = data?.data;
// console.log(orderData)
//   const priceData = orderData?.map((item: TOrder) =>
//     Number(item?.product?.price)
//   );
//   // console.log(priceData);
//   const totalPrice =
//     priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0;
//   //   console.log(totalPrice);

  return (
    <div className="min-h-screen  bg-black">
      <HomeGradient/>
      <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3  p-6 rounded-lg shadow-lg min-h-screen"
          >
            <div className="text-white">
       <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
       </div>
            
            {/* স্ট্যাটস কার্ড গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="border border-gray-700 p-4 rounded-lg"
              >
                <h3 className="text-white">Total Spend</h3>
                {/* <p className="text-2xl font-bold">৳ {totalPrice}</p> */}
                <div className="h-1 bg-blue-600 mt-2 rounded-full w-3/4" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="border border-gray-700 p-4 rounded-lg"
              >
                <h3 className="text-white">Active Orders</h3>
                {/* <p className="text-2xl font-bold">{orderData?.length}</p> */}
                <div className="h-1 bg-green-500 mt-2 rounded-full w-1/2" />
              </motion.div>
            </div>

            {/* সাম্প্রতিক অর্ডার টেবিল */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border border-gray-700  text-white">
                  <tr>
                    <th className="p-3 text-left">Transaction ID</th>
                    <th className="p-3 text-left">Seller</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {orderData.map((item: TOrder) => (
                    <tr key={item._id}>
                      <td className="p-3">{item?._id}</td>
                      <td className="p-3">{item?.product?.authorName}</td>
                      <td className="p-3">৳ {item?.product?.price}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          {item?.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </motion.main>
    </div>
  );
};

export default UserDashboard;
