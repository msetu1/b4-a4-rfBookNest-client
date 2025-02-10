import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks";
import { RingLoader } from "react-spinners";

import { toast } from "sonner";
import { useCurrentUser } from "../../../redux/feature/auth/authSlice";
import { useAddBookMutation } from "../../../redux/feature/productManagement/productAPi";

interface BookFormData {
  title: string;
  numberOfBooks: number;
  description: string;
  image: FileList;
  price: string;
  category: string;
}

const AddProduct = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<BookFormData>();

  const user = useAppSelector(useCurrentUser);

  const [addBook] = useAddBookMutation();

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<BookFormData> = async (data) => {
    try {
      setLoading(true);
      const image = data.image[0]; // Ensure this is correct
      const newFormData = new FormData();
      newFormData.append("file", image); // Add the image file
      newFormData.append("upload_preset", "humayunkabir"); // Your upload preset
      newFormData.append("cloud_name", "dn7oeugls"); // Not necessary for the request

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dn7oeugls/image/upload",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.url;
      const { description, numberOfBooks, price, title, category } = data;
      const bookData = {
        description,
        numberOfBooks,
        price,
        title,
        imageUrl,
        authorName: user?.name,
        authorEmail: user?.email,
        isAvaillable: true,
        category,
      };

      // console.log("Book data,", bookData);

      const finalResult = await addBook(bookData).unwrap();
      // console.log("Final result, ", finalResult);

      if (finalResult.success) {
        toast.success("Book Data Added Successfully", { duration: 2000 });
      }

      reset()

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
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          {/* Number of Books & Image Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Books
              </label>
              <input
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
                  Number of Books is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              {loading ? (
                <p>Uploading, please wait...</p>
              ) : (
                <input
                  {...register("image", { required: "Image is required" })}
                  type="file"
                  accept="image/*"
                  className={`w-full px-4 py-2 text-white rounded-lg  border ${
                    errors.image
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2`}
                />
              )}
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">Image is required</p>
              )}
            </div>
          </div>

          {/* Book Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Book Category
            </label>
            <select
              id="bookCategory"
              className={`w-full px-4 py-2 text-gray-700 rounded-lg border ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
              {...register("category", { required: "Category is required" })}
              defaultValue="" // Use defaultValue for the default selection
            >
              <option value="" disabled>
                --Select a Category--
              </option>
              <option value="fiction">Fiction</option>
              <option value="academic">Academic & Education</option>
              <option value="children">Children's Books</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">Category is required</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
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
              <p className="text-red-500 text-sm mt-1">Price is required</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
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
                Description is required
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

export default AddProduct;
