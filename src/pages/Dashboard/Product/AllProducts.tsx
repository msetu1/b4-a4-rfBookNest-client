import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useAllBooksDataQuery } from "../../../redux/feature/productManagement/productAPi";
import GradientBackground from "../../../UI/GradientBackground";
import AllProductBanner from "../../../components/Common/AllProductBanner";


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

const ITEMS_PER_PAGE = 9;

const AllProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } =useAllBooksDataQuery(undefined);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, priceFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
        <GradientBackground />
        <RingLoader  size={80} color="#C16EFD" />
      </div>
    );
  }

  const filterBooks = (books: TBook[] | undefined) => {
    return books?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortBooks = (books: TBook[] | undefined) => {
    if (!books) return undefined;
    const sorted = [...books];

    if (priceFilter === "lowToHigh") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\D/g, ""));
        const priceB = parseFloat(b.price.replace(/\D/g, ""));
        return priceA - priceB;
      });
    } else if (priceFilter === "highToLow") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\D/g, ""));
        const priceB = parseFloat(b.price.replace(/\D/g, ""));
        return priceB - priceA;
      });
    }
    return sorted;
  };

  const getPaginatedData = (books: TBook[] | undefined) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return books?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  let baseBooks: TBook[] | undefined = [];
  switch (activeTab) {
    case "all":
      baseBooks = data?.data;
      break;
    case "fiction":
      baseBooks = data?.data?.filter(
        (item: TBook) => item.category === "fiction"
      );
      break;
    case "education":
      baseBooks = data?.data?.filter(
        (item: TBook) => item.category === "academic"
      );
      break;
    case "children":
      baseBooks = data?.data?.filter(
        (item: TBook) => item.category === "children"
      );
      break;
  }

  const searchedBooks = filterBooks(baseBooks);
  const sortedBooks = sortBooks(searchedBooks);
  const totalItems = sortedBooks?.length || 0;
  const paginatedBooks = getPaginatedData(sortedBooks);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const tabs = [
    { label: "All", value: "all" },
    { label: "Fiction", value: "fiction" },
    { label: "Education", value: "education" },
    { label: "Children", value: "children" },
  ];
  return (
    <div className="">
     <div className="mb-16">
     <AllProductBanner setPriceFilter={setPriceFilter} priceFilter={priceFilter} setSearchTerm={setSearchTerm} searchTerm={searchTerm} /> 
     </div>
     <div className=" text-center max-w-[90%] mx-auto ">
        <div className="p-4">
           <div className="w-full  mb-8">
              <div className="flex space-x-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    className={`relative px-4 text-black text-xl py-2  font-semibold transition ${
                      activeTab === tab.value
                        ? "text-blue-500 font-semibold focus:text-blue-500"
                        : "text-gray-800 hover:text-blue-500 "
                    }`}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                    {activeTab === tab.value && (
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 focus:text-blue-500"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          <div className="mt-4">
            <div className=" rounded ">
              <div className="grid lg:grid-cols-4 gap-y-16 gap-x-5 md:grid-cols-2 grid-cols-1 ">
                {paginatedBooks?.length ? (
                  paginatedBooks.map((item: TBook) => (
                    <div
                      key={item._id}
                      className=" bg-black border-gray-700 bg-gradient-to-br from-purple-500 via-transparent to-[#6a00f4] rounded-lg shadow-lg text-white text-left"
                    >
                      <div>
                      <div className="flex items-center justify-center mb-4">
                        <img
                          src={item?.imageUrl}
                          alt="Book Cover"
                          className="w-full h-[240px] rounded-md shadow-md"
                        />
                      </div>
                      <div className="px-4 pb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {item?.title.slice(0, 30)} ...
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        {item.description.slice(0, 200)} ...
                      </p>
                      <p className="text-gray-300 text-sm mb-4">
                       Book Discount: {item.bookDiscount} 
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-400">
                          $ {item?.price}
                        </span>
                        <Link
                          to={`/product-details/${item._id}`}
                          className="px-4 py-2 text-sm font-medium transition text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
                        >
                          View Details
                        </Link>
                      </div>
                      </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="ml-32 flex items-center justify-center ">
                    <img  src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?ga=GA1.1.752082068.1672656162&amp;semt=ais_hybrid" alt="" />
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
                <span className="font-semibold px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
