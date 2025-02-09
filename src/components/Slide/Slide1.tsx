import { Button } from "antd";

const Slide1 = () => {
    return (
        <div
      className="w-full bg-center bg-cover h-[530px] "
      style={{
        backgroundImage: `url("https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip")`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-60 overflow-hidden">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
          Discover the   <span className="text-blue-400 font-lobster">World</span> of Books!
          </h1>
          <p className="text-white mt-3 font-semibold">📚 Dive into an endless collection of books from every genre, <br /> carefully curated for book lovers like you.</p>
          <br />
         <div className="flex items-center justify-center">
         <Button className=" px-8 py-5 text-sm text-white font-medium border border-[#C16EFD] rounded-lg bg-[linear-gradient(105deg,_#6384FC_4.1%,_#C16EFD_54.8%,_#6384FC_92.38%)] flex items-center justify-center">All Book</Button>
         </div>
        </div>
      </div>
    </div>
    );
};

export default Slide1;