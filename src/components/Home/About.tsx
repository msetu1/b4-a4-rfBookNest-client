import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="my-16 max-w-[90%] mx-auto ">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Section - Images */}
        <div className="w-full lg:w-[50%] flex flex-col md:flex-row lg:flex-row gap-4">
          <img
            className="w-full md:w-[290px] lg:w-[290px] md:h-[400px] lg:mt-8 md:mt-0 mt-0 lg:h-[477px] h-auto object-cover"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Library Interior"
          />
          <img
            className="w-full md:w-[407px] lg:w-[407px] md:h-[450px] lg:h-[553px] h-auto object-cover"
            src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7"
            alt="Bookshop Shelves"
          />
        </div>

        {/* Right Section - Text Content */}
        <div className="w-full lg:w-[50%] flex items-center justify-center">
          <div className="max-w-[600px] text-center lg:text-left">
            <div className="mb-4">
              <h2 className="text-3xl font-bold mb-2 max-w-[250px] mx-auto lg:mx-0">
                ABOUT THE
              </h2>
              <img
                src="https://i.ibb.co.com/ZRCHTwMK/Rectangle-68.png"
                alt="Decorative Line"
                className="mx-auto lg:mx-0"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">rfBookNest</h2>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              Welcome to <strong>rfBookNest</strong>, your ultimate haven for book lovers, where literature comes alive, and every page tells a story. Whether you are searching for the latest <strong>bestsellers, timeless classics, or hidden literary gems</strong>, we have curated a diverse collection that caters to every reader’s taste. 
              <br /> <br />
              Step into our world and explore an extensive collection that transcends genres, cultures, and eras. Whether you are a casual reader, an avid book collector, or someone looking to rediscover the joy of reading, <strong>rfBookNest</strong> is your go-to destination.
            </p>

            <Link to="/meet-our-team">
              <button
                type="submit"
                className="mt-5 px-6 py-3 text-white font-medium border border-[#C16EFD] rounded-lg bg-[linear-gradient(105deg,_#6384FC_4.1%,_#C16EFD_54.8%,_#6384FC_92.38%)] flex items-center justify-center mx-auto lg:mx-0"
              >
                <p>Explore Now</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
