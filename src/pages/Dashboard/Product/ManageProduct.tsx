import { RingLoader } from "react-spinners";
import {
  useAllBooksDataQuery,
  useDeleteBookMutation,
} from "../../../redux/feature/productManagement/productAPi";
import { useAppSelector } from "../../../redux/hooks";

import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../../redux/feature/auth/authSlice";

type TBook = {
  authorEmail: string;
  authorName: string;
  category: string;
  description: string;
  imageUrl: string;
  isAvaillable: boolean;
  isDeleted: boolean;
  numberOfBooks: number;
  price: string;
  title: string;
  __v: number;
  _id: string;
};
const ManageProduct = () => {
  const { data, isLoading } = useAllBooksDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  });
  const [deleteBook] = useDeleteBookMutation();
  const user = useAppSelector(useCurrentUser);
  

  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  const allBooksData = data?.data;
  // console.log(allBooksData);

  const matchBook = allBooksData.filter(
    (item: TBook) => item?.authorEmail === user?.email
  );

  const handleDeleteProduct = async (id: string) => {
    // console.log(id);
    const bookInfo = {
      id: id,
    };
    try {
      const result = await deleteBook(bookInfo).unwrap();
      // console.log(result);
      toast.success(result?.message, { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong..", { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
      <div className="container p-2 mx-auto sm:p-4  text-white">
        <h2 className="mb-8 text-4xl font-semibold leading-tight text-center">
          My Books
        </h2>
        <div className="">
          <div className="">
            <table className="min-w-full  h-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="">
                <tr className="text-left">
                  <th className="p-3 text-base">Image</th>
                  <th className="p-3 text-base">Title</th>
                  <th className="p-3 text-base">category</th>
                  <th className="p-3 text-base">price</th>
                  <th className="p-3 text-base">Number Of Books</th>
                  <th className="p-3 text-base">Action</th>
                </tr>
              </thead>
              <tbody>
                {matchBook.map((item: TBook) => (
                  <tr key={item._id} className="border-b border-opacity-20 ">
                    <td className="p-3">
                      <div className="flex items-center justify-start">
                        <div className="w-14 h-14  overflow-hidden ">
                          <img
                            className="w-full h-full object-cover rounded-full"
                            src={item?.imageUrl}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p>{item?.title}</p>
                    </td>
                    <td className="p-3">
                      <p>{item?.category}</p>
                    </td>
                    <td className="p-3">
                      <p>৳ {item?.price}</p>
                    </td>
                    <td className="p-3 ">
                      <p>{item?.numberOfBooks}</p>
                    </td>
                    {/* <td className="p-3 relative">
                      <button
                        onClick={() => toggleDropdown(item._id)}
                        className="relative text-2xl"
                      >
                        <BsThreeDotsVertical />
                      </button>
                      {dropdownOpen === item._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white z-10 border border-gray-200 rounded-lg shadow-lg ">
                          <ul className="py-1 space-y-2">
                            <li>
                              <button className="text-center py-2 bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white z-10 border border-gray-200 rounded-lg shadow-lg w-full">
                                <Link
                                  to={`/admin/dashboard/update-product/${item._id}`}
                                
                                >
                                  Update
                                </Link>
                              </button>
                            </li>
                            {user && (
                              <button
                                onClick={() => handleDeleteProduct(item?._id)}
                                className="text-center  py-2 bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white z-10 border border-gray-200 rounded-lg shadow-lg w-full"
                              >
                                Delete
                              </button>
                            )}
                          </ul>
                        </div>
                      )}
                    </td> */}
                    <td className="pt-7 flex items-center justify-start gap-2">
                      <Link
                        to={`/admin/dashboard/update-product/${item._id}`}
                        className="text-white bg-gradient-to-r from-purple-500 to-blue-500  hover:from-blue-500 hover:to-purple-500 focus:outline-none  text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                      >
                        <span className="text-white">Update</span>
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(item?._id)}
                        className="text-white bg-gradient-to-r from-purple-500 to-blue-500  hover:from-blue-500 hover:to-purple-500 focus:outline-none  text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
