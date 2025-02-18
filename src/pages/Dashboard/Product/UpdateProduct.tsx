import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { RingLoader } from "react-spinners";
import {
  useAllBooksDataQuery,
  useUpdateBookMutation,
} from "../../../redux/feature/productManagement/productAPi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import HomeGradient from "../../../UI/HomeGradient";
import GradientBackground from "../../../UI/GradientBackground";

interface BookFormData {
  title: string;
  numberOfBooks: number;
  description: string;
  image: FileList;
  price: string;
  bookDiscount:number;
  category: string;
}

type TBook = {
  authorEmail: string;
  authorName: string;
  category: string;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  isDeleted: boolean;
  numberOfBooks: number;
  price: string;
  bookDiscount:number;
  title: string;
  __v: number;
  _id: string;
};

const UpdateProduct = () => {
  const { data: allBookData } = useAllBooksDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [updateBook] = useUpdateBookMutation();

  const { id } = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BookFormData>();

  const matchBook = allBookData?.data?.find((item: TBook) => item?._id === id);
 

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<BookFormData> = async (data) => {
    try {

      setLoading(true);

      const bookData = {
        BookId: id,
        bookInfo: data,
      };

      const result = await updateBook(bookData).unwrap();
      toast.success(result.message,{duration:2000});

      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("something went wrong..", { duration: 2000 });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
        <GradientBackground />
        <RingLoader  size={80} color="#C16EFD" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4">
      <HomeGradient/>
      <h1 className="text-3xl font-bold text-white pt-5 mb-6">Update a Book</h1>
      <div className="flex items-center justify-center">
      <div className="max-w-[840px] w-full text-white rounded-lg shadow-lg p-8 md:p-12 border border-gray-700 mb-12">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        
          <div className="flex items-center justify-between gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  defaultValue={matchBook?.title}
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  placeholder="Enter book title"
                  className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 focus:outline-none focus:ring-2"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">Title is required</p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Number of Books</label>
                <input
                  defaultValue={matchBook?.numberOfBooks}
                  {...register("numberOfBooks", { required: "Number of Books is required" })}
                  type="number"
                  placeholder="Numbers"
                  className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 focus:outline-none focus:ring-2"
                />
                {errors.numberOfBooks && (
                  <p className="text-red-500 text-sm mt-1">Number of Books is required</p>
                )}
              </div>
          </div>

          <div className="flex items-center justify-between gap-4">
              <div className="w-full lg:w-[50%]">
                <label className="block text-sm font-medium mb-2">Book Category</label>
                <select
                  defaultValue={matchBook?.category}
                  id="bookCategory"
                  {...register("category", { required: "Category is required" })}
                  className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 focus:outline-none focus:ring-2"
                >
                  <option value="" disabled>--Select a Category--</option>
                  <option value="fiction">Fiction</option>
                  <option value="academic">Academic & Education</option>
                  <option value="children">Children's Books</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">Category is required</p>
                )}
              </div>
          </div>

          <div className="flex items-center justify-between gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  defaultValue={matchBook?.price}
                  {...register("price", { required: "Price is required" })}
                  type="text"
                  placeholder="$"
                  className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 focus:outline-none focus:ring-2"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">Price is required</p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Book Discount</label>
                <input
                  defaultValue={matchBook?.bookDiscount}
                  {...register("bookDiscount", { required: "Book Discount is required" })}
                  type="text"
                  placeholder="%"
                  className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 focus:outline-none focus:ring-2"
                />
                {errors.bookDiscount && (
                  <p className="text-red-500 text-sm mt-1">Book Discount is required</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                defaultValue={matchBook?.description}
                {...register("description", { required: "Description is required" })}
                placeholder="Enter book description"
                className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 focus:outline-none focus:ring-2"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">Description is required</p>
              )}
            </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
          >
            Add Book
          </button>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default UpdateProduct;
