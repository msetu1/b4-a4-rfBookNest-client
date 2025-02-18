
import { Link } from "react-router-dom";

const Slide2 = () => {
    return (
        <div
      className="w-full bg-center bg-cover h-[530px] "
      style={{
        backgroundImage: `url("https://i.pinimg.com/736x/f6/59/18/f6591862a444987051904a68be3a2161.jpg")`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-60 overflow-hidden">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
          Your Next <span className="text-blue-400 font-lobster">Favorite</span>  Read Awaits! 
          </h1>
          <p className="text-white mt-3 font-semibold">📖 Explore bestselling novels, hidden gems, and timeless classics, <br /> all in one convenient place.</p>
          <br />
          {/* <Button buttonName={`By Now`}></Button> */}
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

export default Slide2;