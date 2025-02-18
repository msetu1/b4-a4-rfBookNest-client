import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks";
import { RingLoader } from "react-spinners";

import { toast } from "sonner";
import { useCurrentUser } from "../../../redux/feature/auth/authSlice";
import { useAddBookMutation } from "../../../redux/feature/productManagement/productAPi";
import HomeGradient from "../../../UI/HomeGradient";
import GradientBackground from "../../../UI/GradientBackground";
import { useNavigate } from "react-router-dom";

interface BookFormData {
  title: string;
  numberOfBooks: number;
  description: string;
  image: FileList;
  price: string;
  bookDiscount:number;
  category: string;
}

const AddProduct = () => {
  const navigate=useNavigate()
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
      const image = data.image[0];
      const newFormData = new FormData();
      newFormData.append("file", image);
      newFormData.append("upload_preset", "my-file");
      newFormData.append("cloud_name", "dxm2ei4u1");
  
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxm2ei4u1/image/upload",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const imageUrl = response.data.url;
      const { description, numberOfBooks, price, title, category, bookDiscount } = data;
      
      const bookData = {
        description,
        numberOfBooks,
        price,
        bookDiscount,
        title,
        imageUrl,
        authorName: user?.name,
        authorEmail: user?.email,
        isAvailable: true,
        category,
      };
      const result = await addBook(bookData).unwrap();
      if (result.success) {
        navigate('/admin/dashboard/manage-product')
        toast.success("Book Data Added Successfully", { duration: 2000 });
      }
  
      reset();
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong..", { duration: 2000 });
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
    <div className="min-h-screen  bg-black px-4">
      <HomeGradient/>
      <h1 className="text-3xl font-bold text-white pt-5  mb-6">Add a Book</h1>
      <div className="flex items-center justify-center">
      <div className="max-w-[840px] w-full text-white rounded-lg shadow-lg p-8 md:p-12 border border-gray-700 mb-12">
       
       <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* title & number of book  */}
        <div className="flex items-center justify-between gap-4">
          {/* Title Field */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter book title"
              className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
                errors.title} focus:outline-none focus:ring-2`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>
          {/* Number of Books */}
          <div className="w-full">
             <label className="block text-sm font-medium mb-2">
               Number of Books
             </label>
             <input
               {...register("numberOfBooks", {
                 required: "Number of Books is required",
               })}
               type="number"
               placeholder="Numbers"
               className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
                 errors.numberOfBooks} focus:outline-none focus:ring-2`}
             />
             {errors.numberOfBooks && (
               <p className="text-red-500 text-sm mt-1">
                 Number of Books is required
               </p>
             )}
           </div>
        </div>

        {/* Book Category & Image Upload  */}
         <div className="flex items-center justify-between gap-4">
          {/* Book Category */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">
              Book Category
            </label>
            <select
              id="bookCategory"
              className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
                errors.category} focus:outline-none focus:ring-2`}
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
          {/* Image Upload */}
           <div className="w-full">
             <label className="block text-sm font-medium mb-2">Image</label>
             {loading ? (
               <p>Uploading, please wait...</p>
             ) : (
               <input
                 {...register("image", { required: "Image is required" })}
                 type="file"
                 accept="image/*"
                 className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
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
        {/* Price Field discount */}
         <div className="flex items-center justify-between gap-4">
          {/* Price Field */}
          <div className="w-full">
           <label className="block text-sm font-medium mb-2">Price</label>
           <input
             {...register("price", { required: "Price is required" })}
             type="number"
             placeholder="$"
             className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
               errors.price} focus:outline-none focus:ring-2`}
           />
           {errors.price && (
             <p className="text-red-500 text-sm mt-1">Price is required</p>
           )}
         </div>
        {/* discount Field */}
        <div className="w-full">
           <label className="block text-sm font-medium mb-2">Book Discount</label>
           <input
             {...register("bookDiscount", { required: "Book Discount is required" })}
             type="text"
             placeholder="%"
             className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
               errors.bookDiscount} focus:outline-none focus:ring-2`}
           />
           {errors.bookDiscount && (
             <p className="text-red-500 text-sm mt-1">Book Discount is required</p>
           )}
         </div>

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
             className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
               errors.description} focus:outline-none focus:ring-2`}
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
    </div>
  );
};

export default AddProduct;
