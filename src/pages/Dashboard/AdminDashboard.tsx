import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/hooks";
import HomeGradient from "../../UI/HomeGradient";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";

const AdminDashboard = () => {

  const user = useAppSelector(useCurrentUser);
  
  return (
    <div>
      <div className="min-h-screen bg-black text-white">
      <HomeGradient/>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1  gap-6">
         
            <motion.main
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-3  p-6 rounded-lg shadow-lg min-h-screen"
            >
              <h1 className="text-2xl font-bold mb-6">Sales summary</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-700 p-4 rounded-lg"
                >
                  <h3 className="text-white">Total Sell</h3>
                  {/* <p className="text-2xl font-bold">৳ {totalPrice}</p> */}
                  <div className="h-1 bg-blue-600 mt-2 rounded-full w-3/4" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-700 p-4 rounded-lg"
                >
                  <h3 className="text-white">Active Order</h3>
                  {/* <p className="text-2xl font-bold">{orderData.length}</p> */}
                  <div className="h-1 bg-green-500 mt-2 rounded-full w-1/2" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-700 p-4 rounded-lg"
                >
                  <h3 className="text-white">New Users</h3>
                  <p className="text-2xl font-bold">
                    {/* {usersData?.data?.length - 1} */}
                  </p>
                  <div className="h-1 bg-blue-500 mt-2 rounded-full w-1/3" />
                </motion.div>
              </div>

              {/* সাম্প্রতিক অর্ডার টেবিল */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border border-gray-700  text-white">
                    <tr>
                      <th className="p-3 text-left">transactionId</th>
                      <th className="p-3 text-left">Buyer</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {orderData?.map((item: TOrder) => (
                      <tr key={item._id}>
                        <td className="p-3">{item.transactionId}</td>
                        <td className="p-3">{item?.userInfo.name}</td>
                        <td className="p-3">৳ {item?.product.price}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                            Paid
                          </span>
                        </td>
                      </tr>
                    ))} */}
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
