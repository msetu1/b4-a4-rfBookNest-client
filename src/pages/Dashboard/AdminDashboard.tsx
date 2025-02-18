import { motion } from "framer-motion";
import {  useAppSelector } from "../../redux/hooks";
import HomeGradient from "../../UI/HomeGradient";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";
import { useAllUserDataQuery } from "../../redux/feature/auth/authApi";
import { useAdminOrdersDataQuery } from "../../redux/feature/order/orderApi";
import GradientBackground from "../../UI/GradientBackground";
import { RingLoader } from "react-spinners";
import { TOrder } from "../../types/TOrder";

const AdminDashboard = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: usersData } = useAllUserDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { data, isLoading } = useAdminOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const orderData = data?.data;
const priceData = orderData?.map((item: TOrder) =>
  Number(item.product.price)
);
const totalPrice =
  priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0;
  const formattedPrice = totalPrice.toFixed(4);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
        <GradientBackground />
        <RingLoader size={80} color="#C16EFD" />
        <p className="mt-4 text-lg font-semibold">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-black text-white">
        <HomeGradient />
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6">
            <motion.main
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-3 p-6 rounded-lg shadow-lg min-h-screen"
            >
              <h1 className="text-2xl font-bold mb-6">Sales summary</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-700 p-4 rounded-lg"
                >
                  <h3 className="text-white">Total Sell</h3>
                  <p className="text-2xl font-bold">$ {formattedPrice}</p>
                  <div className="h-1 bg-blue-600 mt-2 rounded-full w-3/4" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-700 p-4 rounded-lg"
                >
                  <h3 className="text-white">Active Order</h3>
                  <p className="text-2xl font-bold">{orderData.length}</p>
                  <div className="h-1 bg-green-500 mt-2 rounded-full w-1/2" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-700 p-4 rounded-lg"
                >
                  <h3 className="text-white">New Users</h3>
                  <p className="text-2xl font-bold">
                    {usersData?.data?.length - 1}
                  </p>
                  <div className="h-1 bg-blue-500 mt-2 rounded-full w-1/3" />
                </motion.div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto ">
                  <thead className="border border-gray-700 bg-[#1B1B31]">
                    <tr>
                      <th className="p-3 text-left">transactionId</th>
                      <th className="p-3 text-left">Buyer</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="border border-gray-700">
                    {orderData?.map((item: TOrder) => (
                      <tr key={item._id}  className="border-b border-gray-700">
                        <td className="p-3">{item.transactionId}</td>
                        <td className="p-3">{item?.userInfo.name}</td>
                        <td className="p-3">$ {item?.product.price}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                            Paid
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

