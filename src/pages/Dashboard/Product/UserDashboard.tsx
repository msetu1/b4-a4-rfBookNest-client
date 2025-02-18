import { motion } from "framer-motion";
import { useCurrentUser } from "../../../redux/feature/auth/authSlice";
import HomeGradient from "../../../UI/HomeGradient";
import { useAppSelector } from "../../../redux/hooks";
import { useUserOrdersDataQuery } from "../../../redux/feature/order/orderApi";
import GradientBackground from "../../../UI/GradientBackground";
import { RingLoader } from "react-spinners";
import { TOrder } from "../../../types/TOrder";

const UserDashboard = () => {
  const user = useAppSelector(useCurrentUser);

  const { data, isLoading } = useUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 30000,
  });
  
  const orderData = data?.data;

  const priceData = orderData?.map((item: TOrder) =>
    Number(item?.product?.price)
  );
  const totalPrice =
    priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0;
    const formattedPrice = totalPrice.toFixed(4);

    if (isLoading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
          <GradientBackground />
          <RingLoader size={80} color="#C16EFD" />
          <p className="mt-4 text-lg font-semibold">Loading User Dashboard...</p>
        </div>
      );
    }

  return (
    <div className="min-h-screen  bg-black text-white">
      <HomeGradient/>
      <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3  p-6 rounded-lg shadow-lg min-h-screen"
          >
            <div className="text-white">
       <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
       </div>
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="border border-gray-700 p-4 rounded-lg"
              >
                <h3 className="text-white">Total Spend</h3>
                <p className="text-2xl font-bold">$ {formattedPrice}</p>
                <div className="h-1 bg-blue-600 mt-2 rounded-full w-3/4" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="border border-gray-700 p-4 rounded-lg"
              >
                <h3 className="text-white">Active Orders</h3>
                <p className="text-2xl font-bold">{orderData?.length}</p>
                <div className="h-1 bg-green-500 mt-2 rounded-full w-1/2" />
              </motion.div>
            </div>

            {/* সাম্প্রতিক অর্ডার টেবিল */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="border border-gray-700 bg-[#1B1B31]">
                  <tr>
                    <th className="p-3 text-left">Transaction ID</th>
                    <th className="p-3 text-left">Seller</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="border border-gray-700">
                  {orderData.map((item: TOrder) => (
                    <tr key={item._id} className="border-b border-gray-700">
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
                </tbody>
              </table>
            </div>
      </motion.main>
    </div>
  );
};

export default UserDashboard;
