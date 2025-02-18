import { Link } from "react-router-dom";

const AllProductBanner = ({setPriceFilter,priceFilter,setSearchTerm,searchTerm}) => {
    return (
        <div
      className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[450px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://www.mmitnetwork.com/wp-content/uploads/2021/08/team-banner.png)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 pt-[160px] text-white  h-full px-4">
        <div className="flex items-center justify-between max-w-[90%] mx-auto">
            <div className="text-center md:text-left ">
            <h1 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold">Explore All Books</h1>
            <h2 className="text-lg md:text-xl font-semibold">
                <Link to="/" className="underline hover:text-gray-300 transition">
                Home
                </Link>{" "}
                / All Products
            </h2>
            </div>
            <div className="">
            <h1 className="text-center mb-5 text-xl font-bold  ">Please Try Search and Filtering</h1>
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
            </div>
        </div>
        
       
      </div>
    </div>
    );
};

export default AllProductBanner;