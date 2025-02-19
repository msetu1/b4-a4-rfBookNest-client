import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RingLoader } from "react-spinners";
import { TOrder } from "../../types/TOrder";
import { toast } from "sonner";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";
import { useDeleteOrderMutation, useUserOrdersDataQuery } from "../../redux/feature/order/orderApi";
import HomeGradient from "../../UI/HomeGradient";
import GradientBackground from "../../UI/GradientBackground";

const ViewUserOrderHistory: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  
  const [isFullTransactionIdVisible, setIsFullTransactionIdVisible] = useState(false);
  const [isFullTitleVisible, setIsFullTitleVisible] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const { data, isLoading } = useUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  });

  
  const [selectedAuthor, setSelectedAuthor] = useState<TOrder | null>(null);


  const userOrderData = data?.data;
  const handleDeleteOrder = async (id: string) => {
   
    const orderInfo = {
      id: id,
    };

   

    try {
      const result = await deleteOrder(orderInfo).unwrap();
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
 
  // Toggle the state to show/hide full transactionId
  const handleSeeMoreClick = () => {
    setIsFullTransactionIdVisible(!isFullTransactionIdVisible);
  };

  // Toggle the state to show/hide full title
  const handleSeeMoreTitleClick = () => {
    setIsFullTitleVisible(!isFullTitleVisible);
  };

if (isLoading) {
return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
        <GradientBackground />
        <RingLoader  size={80} color="#C16EFD" />
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-6 min-h-screen">
       <HomeGradient/>
       <div>
       <h2 className="text-2xl font-bold mb-5">View Order History</h2>
       </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* Table Head */}
          <thead className="border border-gray-700 bg-[#1B1B31]">
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
          <tbody className="border border-gray-700">
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
                <td className="px-6 py-4">
      {isFullTitleVisible 
        ? item?.product?.title 
        : `${item?.product?.title.slice(0, 20)}...`
      }
      <button 
        onClick={handleSeeMoreTitleClick} 
        className="ml-2 text-blue-500"
      >
        {isFullTitleVisible ? 'See less' : 'See more'}
      </button>
    </td>
                <td className="px-6 py-4">$ {item?.product?.price}</td>
                <td className="px-6 py-4">{item?.product?.category}</td>
                <td className="px-6 py-4">
      {isFullTransactionIdVisible 
        ? item?.transactionId 
        : `${item?.transactionId.slice(0, 10)}...`
      }
      <button 
        onClick={handleSeeMoreClick} 
        className="ml-2 text-blue-500"
      >
        {isFullTransactionIdVisible ? 'See less' : 'See more'}
      </button>
    </td>
                <td className="px-6 py-4">{item?.orderStatus}</td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleDeleteOrder(item?._id)}
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Delete
                  </button>
                  <button
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600 "
                    onClick={() => setSelectedAuthor(item)} // Open modal
                  >
                    Author Details
                  </button>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 flex items-center justify-center z-5">
          <div className="bg-black bg-gradient-to-br from-[#6a00f4] via-transparent to-purple-500 text-white rounded-lg w-96 p-6 relative">
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


