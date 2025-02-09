import { Button } from "antd";

const Slide4 = () => {
    return (
        <div
      className="w-full bg-center bg-cover h-[530px] "
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?cs=srgb&dl=pexels-thought-catalog-317580-904616.jpg&fm=jpg")`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-60 overflow-hidden">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
          Read, Learn, <span className="text-blue-400 font-lobster">and</span> Grow!
          </h1>
          <p className="text-white mt-3 font-semibold">📗 Expand your knowledge with a wide range of books designed <br /> to educate, entertain, and inspire.</p>
          <br />
         <div className="flex items-center justify-center">
         <Button className=" px-8 py-5 text-sm text-white font-medium border border-[#C16EFD] rounded-lg bg-[linear-gradient(105deg,_#6384FC_4.1%,_#C16EFD_54.8%,_#6384FC_92.38%)] flex items-center justify-center">All Book</Button>
         </div>
        </div>
      </div>
    </div>
    );
};

export default Slide4;