import { RingLoader } from "react-spinners";
import {
  useAllBooksDataQuery,
  useDeleteBookMutation,
} from "../../../redux/feature/productManagement/productAPi";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "sonner";
import { useCurrentUser } from "../../../redux/feature/auth/authSlice";
import HomeGradient from "../../../UI/HomeGradient";
import GradientBackground from "../../../UI/GradientBackground";
import { Link } from "react-router-dom";

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
  bookDiscount:number;
  title: string;
  __v: number;
  _id: string;
};
const ManageProduct = () => {
  
  const { data, isLoading} = useAllBooksDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  });
  const [deleteBook] = useDeleteBookMutation();
  const user = useAppSelector(useCurrentUser);
  

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
        <GradientBackground />
        <RingLoader  size={80} color="#C16EFD" />
      </div>
    );
  }

  const allBooksData = data?.data;

  const matchBook = allBooksData.filter(
    (item: TBook) => item?.authorEmail === user?.email
  );

  const handleDeleteProduct = async (id: string) => {
    const bookInfo = {
      id: id,
    };
    try {
      const result = await deleteBook(bookInfo).unwrap();
      toast.success(result?.message, { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong..", { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-black">
    <HomeGradient/>
      <h1 className="text-3xl font-bold text-white pt-5 ml-4 mb-6">My Books</h1>
      <div className="container p-2 mx-auto sm:p-4  text-white">
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
              <thead className="border border-gray-700 bg-[#1B1B31]">
                <tr className="text-left">
                  <th className="p-3 text-base">Image</th>
                  <th className="p-3 text-base">Title</th>
                  <th className="p-3 text-base">category</th>
                  <th className="p-3 text-base">price</th>
                  <th className="p-3 text-base">Number Of Books</th>
                  <th className="p-3 text-base">Book Discount</th>
                  <th className="p-3 text-base">Action</th>
                </tr>
              </thead>
              <tbody className="border border-gray-700">
                {matchBook.map((item: TBook) => (
                  <tr key={item._id} className="border-b border-gray-300 border-opacity-20 ">
                    <td className="p-3">
                    <img
                            className="w-[80px] h-[60px] object-cover rounded-lg"
                            src={item?.imageUrl}
                          />
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
                    <td className="p-3 ">
                      <p>{item?.bookDiscount}</p>
                    </td>
                    <td className="pt-7 flex items-center justify-start gap-2">
                      <Link
                        to={`/admin/dashboard/update-product/${item._id}`}
                        className="text-white bg-gradient-to-r from-purple-500 to-blue-500  hover:from-blue-500 hover:to-purple-500 focus:outline-none  text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                      >
                        <span className="text-white">update</span>
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
