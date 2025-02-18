import { Link } from "react-router-dom";

const Slide3 = () => {
    return (
        <div
      className="w-full bg-center bg-cover h-[530px] "
      style={{
        backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/023/042/182/small_2x/free-stack-of-books-with-pencil-holder-and-glasses-against-a-chalkboard-generate-ai-free-photo.jpg")`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50 overflow-hidden">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
          Books That   <span className="text-blue-400 font-lobster">Inspire</span> and Transform!
          </h1>
          <p className="text-white mt-3 font-semibold">✨ Whether it's fiction, self-help, or history, find books <br /> that enlighten and empower your mind.</p>
          <br />
         <div className="flex items-center justify-center">
         <Link to='/all-product'>
         <button className="mt-6 px-8 py-2  font-semibold bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none text-white">All Book</button>
         </Link>
         </div>
        </div>
      </div>
    </div>
    );
};

export default Slide3;