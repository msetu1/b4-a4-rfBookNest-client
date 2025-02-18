import { useState } from "react";
import { RingLoader } from "react-spinners";
import { useAppSelector } from "../../../redux/hooks";
import { TOrder } from "../../../types/TOrder";
import { toast } from "sonner";
import { useCurrentUser } from "../../../redux/feature/auth/authSlice";
import { useAcceptOrderMutation, useAdminOrdersDataQuery, useCancelOrderMutation, useDeleteOrderMutation } from "../../../redux/feature/order/orderApi";
import HomeGradient from "../../../UI/HomeGradient";
import GradientBackground from "../../../UI/GradientBackground";

const ManagingOrders = () => {
  const user = useAppSelector(useCurrentUser); 

  const [isFullTransactionIdVisible, setIsFullTransactionIdVisible] = useState(false);
  const [isFullTitleVisible, setIsFullTitleVisible] = useState(false);

  // API call for user email data
  const { data, isLoading } = useAdminOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  });

  const [acceptOrder] = useAcceptOrderMutation();
  const [cencelOrder] = useCancelOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  // Modal state
  const [selectedBuyer, setSelectedBuyer] = useState<TOrder | null>(null);
  const orderData = data?.data;

  // accept order
  const handleAcceptOrder = async (id: string) => {
    const bookInfo = {
      id: id,
    };

    try {
      const result = await acceptOrder(bookInfo).unwrap();
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  // cancel order
  const handleCancelOrder = async (id: string) => {
    const bookInfo = {
      id: id,
    };

    try {
      const result = await cencelOrder(bookInfo).unwrap();
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };


// delete  data
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
        <p className="mt-4 text-lg font-semibold">Loading Managing Oder...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <HomeGradient />
      <h1 className="text-3xl font-bold text-white pt-5 ml-4 mb-6">Managing Order</h1>
      <div className="container p-2 mx-auto sm:p-4 overflow-x-auto text-white">
        <table className="min-w-full table-auto">
          <thead className="border border-gray-700 bg-[#1B1B31]">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Tran. ID</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">C. Status</th>
              <th className="px-6 py-3 text-left">Action</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="border border-gray-700">
            {orderData?.map((item: TOrder) => (
              <tr key={item._id} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <img
                    className="w-[70px] h-[50px] object-cover rounded-lg"
                    src={item?.product?.imageUrl}
                  />
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
                {item?.orderStatus === "pending" && (
                  <td className="pt-7 flex items-center justify-center gap-2">
                    <button 
                     onClick={() => handleAcceptOrder(item?._id)}
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600">
                      Accept
                    </button>
                    <button 
                     onClick={() => handleCancelOrder(item?._id)}
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600">
                      Cancel
                    </button>
                  </td>
                )}
                {item?.orderStatus !== "pending" && (
                  <td className="py-4 space-x-1.5 text-center">
                    <button
                      disabled
                      className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                    >
                      Already {item?.orderStatus}
                    </button>
                  </td>
                )}
                <td className="px-6 py-4 ">
                  <button 
                    onClick={() => handleDeleteOrder(item?._id)}
                  className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600">
                    Delete
                  </button>
                </td>
                <td className="px-6 py-4 ">
                  <button
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                    onClick={() => setSelectedBuyer(item)} // Modal open
                  >
                    Buyer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-gradient-to-br from-[#6a00f4] via-transparent to-purple-500 text-white rounded-lg w-96 p-6 relative">
            <h3 className="font-bold text-lg mb-4">Buyer Details</h3>
            <p className="py-2">
              <strong>Name:</strong> {selectedBuyer?.userInfo.name}
            </p>
            <p className="py-2">
              <strong>Email:</strong> {selectedBuyer?.userInfo.email}
            </p>
            <p className="py-2">
              <strong>Transaction ID:</strong> {selectedBuyer?.transactionId}
            </p>
            <div className="absolute top-3 right-3">
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600"
                onClick={() => setSelectedBuyer(null)} // Modal close
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

export default ManagingOrders;
