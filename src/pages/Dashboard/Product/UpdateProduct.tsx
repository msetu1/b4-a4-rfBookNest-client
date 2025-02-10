import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { RingLoader } from "react-spinners";
import {
  useAllBooksDataQuery,
  useUpdateBookMutation,
} from "../../../redux/feature/productManagement/productAPi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

interface BookFormData {
  title: string;
  numberOfBooks: number;
  description: string;
  image: FileList;
  price: string;
  category: string;
}

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

const UpdateProduct = () => {
  const { data: allBookData } = useAllBooksDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 60000,
  });

  const [updateBook] = useUpdateBookMutation();

  //   console.log(data?.data);

  const { id } = useParams();
  //   console.log(id);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BookFormData>();

  const matchBook = allBookData?.data?.find((item: TBook) => item?._id === id);
  //   console.log(matchBook);

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<BookFormData> = async (data) => {
    try {
      //   console.log(data);

      setLoading(true);

      const bookData = {
        BookId: id,
        bookInfo: data,
      };
      //   console.log(bookData);

      const result = await updateBook(bookData).unwrap();
      //   console.log(result);
      toast.success(result.message,{duration:2000});

      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("something went wrong..", { duration: 2000 });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
      <div className="max-w-4xl w-full text-white rounded-lg shadow-lg p-8 md:p-12 bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
        <h1 className="text-3xl font-bold text-center mb-6">Add a Book</h1>
        <p className="text-center text-gray-400 mb-8">
          Add a new book to your collection
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              defaultValue={matchBook?.title}
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter book title"
              className={`w-full px-4 py-2 text-white rounded-lg  border ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                Title is required you must be type{" "}
              </p>
            )}
          </div>

          {/* Number of Books & Price*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                defaultValue={matchBook?.price}
                {...register("price", { required: "Price is required" })}
                type="text"
                placeholder="৳"
                className={`w-full px-4 py-2 text-white rounded-lg  border ${
                  errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  Price is required you must be type{" "}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Books
              </label>
              <input
                defaultValue={matchBook?.numberOfBooks}
                {...register("numberOfBooks", {
                  required: "Number of Books is required",
                })}
                type="number"
                placeholder="Numbers"
                className={`w-full px-4 py-2 text-white rounded-lg  border ${
                  errors.numberOfBooks
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {errors.numberOfBooks && (
                <p className="text-red-500 text-sm mt-1">
                  Number of Books is required you must be type
                </p>
              )}
            </div>
          </div>

          {/* Book Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Book Category
            </label>
            <select
              defaultValue={matchBook?.category}
              id="bookCategory"
              className={`w-full px-4 py-2 text-gray-700 rounded-lg border ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
              {...register("category", { required: "Category is required" })}
              // Use defaultValue for the default selection
            >
              <option value="" disabled>
                --Select a Category--
              </option>
              <option value="fiction">Fiction</option>
              <option value="academic">Academic & Education</option>
              <option value="children">Children's Books</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                Category is required you must be type{" "}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              defaultValue={matchBook?.description}
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter book description"
              className={`w-full px-4 py-2 text-white rounded-lg  border ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required you must be type
              </p>
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
  );
};

export default UpdateProduct;
