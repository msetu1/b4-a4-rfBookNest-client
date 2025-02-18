import {useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";

import { useAllBooksDataQuery } from "../redux/feature/productManagement/productAPi";

import GradientBackground from "../UI/GradientBackground";
import CommonBanner from "../components/Common/CommonBanner";
import ProceedToBuy from "./Payment/ProceedToBuy";

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
const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useAllBooksDataQuery(undefined);
 ;
  const bookData = data?.data?.find((item: TBook) => item._id === id);


 // loading 
 if (isLoading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
      <GradientBackground />
      <RingLoader  size={80} color="#C16EFD" />
      <p className="mt-4 text-lg font-semibold">Loading Product Details...</p>
    </div>
  );
}

  return (
    <div>
      <CommonBanner title="Explore the Features: Product Insights" links="Product Details" />
      <div className=" text-white mt-16">
        {/* Book Details Container */}
        <div className="bg-gradient-to-br from-purple-500 via-transparent to-[#6a00f4] max-w-[90%] mx-auto flex flex-col md:flex-row items-center gap-8 bg-black p-8 rounded-xl shadow-lg">
          {/* Book Cover */}
          <div className="w-full md:w-1/3">
            <img
              src={bookData?.imageUrl}
              alt="Book Cover"
              className="w-full h-full rounded-lg shadow-lg "
            />
          </div>

          {/* Book Information */}
          <div className="w-full md:w-2/3">
            <h1 className="text-xl font-bold mb-2">{bookData?.title}</h1>
            <h2 className="text-lg text-blue-400 mb-2">
              By {bookData?.authorName}
            </h2>
            <p className="text-gray-300 mb-2">{bookData?.description}</p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold">Category : </span>{" "}
              {bookData?.category}
            </p>
            <p className="text-gray-400 mt-6">
              <span className="font-semibold">Number Of Books : </span>{" "}
              {bookData?.numberOfBooks}
            </p>
            <p className="text-gray-400 mt-2">
            Discount on purchasing 5 books
            </p>
            <p className="text-gray-400 ">
              <span className="font-semibold">Discount : </span>
              {bookData?.bookDiscount} %
            </p>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-400">
                $ {bookData?.price}
              </span>
              <ProceedToBuy bookData={bookData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
