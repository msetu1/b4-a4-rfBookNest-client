import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  useDeleteOrderMutation,
  useGetUserOrdersDataQuery,
} from "../../redux/feature/order/orderApi";
import { RingLoader } from "react-spinners";
import { TOrder } from "../../types/TOrder";
import { toast } from "sonner";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";
import HomeGradient from "../../UI/HomeGradient";

const ViewUserOrderHistory: React.FC = () => {
  const user = useAppSelector(useCurrentUser); // বর্তমান ইউজারের ডেটা সিলেক্ট করা হচ্ছে
  const [deleteOrder] = useDeleteOrderMutation();
  // API কলে userEmailData পাঠানো
  const { data, isLoading } = useGetUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  });

  // console.log("data =>", data);
  const [selectedAuthor, setSelectedAuthor] = useState<TOrder | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  const userOrderData = data?.data;
  const handleDeleteOrder = async (id: string) => {
    // console.log(id);
    const orderInfo = {
      id: id,
    };

    // console.log(orderInfo);

    try {
      const result = await deleteOrder(orderInfo).unwrap();
      // console.log(result);
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="bg-black text-white p-6 min-h-screen">
       <HomeGradient/>
       <div>
       <h2 className="text-2xl font-bold mb-5">View Order History</h2>
       </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* Table Head */}
          <thead className="border border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Transaction ID</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {userOrderData?.map((item: TOrder) => (
              <tr key={item._id} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full h-12 w-12 overflow-hidden">
                      <img
                        src={item?.product?.imageUrl}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{item?.product?.title}</td>
                <td className="px-6 py-4">৳ {item?.product?.price}</td>
                <td className="px-6 py-4">{item?.product?.category}</td>
                <td className="px-6 py-4">
                  {item?.transactionId.slice(0, 10)}...
                </td>
                <td className="px-6 py-4">{item?.orderStatus}</td>
                <td className="py-4 text-center">
                  <button
                    onClick={() => handleDeleteOrder(item?._id)}
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                    onClick={() => setSelectedAuthor(item)} // Open modal
                  >
                    Author Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 flex items-center justify-center z-5">
          <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white rounded-lg w-96 p-6 relative">
            <h3 className="font-bold text-lg mb-4">Author Details</h3>
            <p className="py-2">
              <strong>Name:</strong> {selectedAuthor?.product?.authorName}
            </p>
            <p className="py-2">
              <strong>Email:</strong> {selectedAuthor?.product?.authorEmail}
            </p>

            <div className="absolute top-3 right-3">
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600"
                onClick={() => setSelectedAuthor(null)} // Close modal
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUserOrderHistory;
