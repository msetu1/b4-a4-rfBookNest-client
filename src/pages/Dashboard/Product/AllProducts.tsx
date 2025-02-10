import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useAllBooksDataQuery } from "../../../redux/feature/productManagement/productAPi";
import GradientBackground from "../../../UI/GradientBackground";


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

const ITEMS_PER_PAGE = 9;

const AllProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } =useAllBooksDataQuery(undefined);

  // console.log(data);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, priceFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
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

  return (
    <div className="bg-black py-16">
      <GradientBackground/>
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4 ">Explore All Books</h1>
        <div className="mb-4 flex flex-col md:flex-row justify-center gap-4 px-4">
          <input
            type="text"
            placeholder="Search ..."
            className="p-2 rounded border border-gray-300 text-white bg-transparent md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="p-2 rounded border border-gray-300 text-white bg-transparent md:w-64 appearance-none focus:outline-none"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option className="bg-gray-900 text-white" value="">
              Price Filter
            </option>
            <option className="bg-gray-900 text-white" value="lowToHigh">
              Low to High
            </option>
            <option className="bg-gray-900 text-white" value="highToLow">
              High to Low
            </option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex border-b border-gray-300">
            {[
              { label: "All", value: "all" },
              { label: "Fiction", value: "fiction" },
              { label: "Education", value: "education" },
              { label: "Children", value: "children" },
            ].map((tab) => (
              <button
                key={tab.value}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab.value
                    ? "text-white bg-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <div className="p-4 rounded">
              <div className="grid lg:grid-cols-3 gap-5 px-5 md:grid-cols-2 grid-cols-1">
                {paginatedBooks?.length ? (
                  paginatedBooks.map((item: TBook) => (
                    <div
                      key={item._id}
                      className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] p-6 rounded-lg shadow-lg text-white"
                    >
                      <div className="flex items-center justify-center mb-4">
                        <img
                          src={item?.imageUrl}
                          alt="Book Cover"
                          className="w-44 h-40 rounded-md shadow-md"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item?.title.slice(0, 30)} ...
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        {item.description.slice(0, 200)} ...
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-400">
                          ট {item?.price}
                        </span>
                        <Link
                          to={`/product-details/${item._id}`}
                          className="px-4 py-2 text-sm font-medium transition text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300">No books found.</p>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
                <span className="text-white px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 mx-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
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
