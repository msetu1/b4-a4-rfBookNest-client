import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="my-16 max-w-[90%] mx-auto border">
          <div className="flex items-center justify-between gap-16">
            {/* Left Section - Images */}
            <div className="w-full lg:w-[50%] border flex flex-col md:flex-row lg:flex-row gap-4">
              <img
                className="lg:w-[290px] md:w-[290px] w-full md:h-[477px] lg:h-[477px] h-full mt-10"
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="Library Interior"
              />
              <img
                className="lg:w-[407px] md:w-[407px] w-full md:h-[553px] lg:h-[553px] h-full"
                src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7"
                alt="Bookshop Shelves"
              />
            </div>
    
            {/* Right Section - Text Content */}
            <div className="w-full lg:w-[50%] border flex items-center justify-end">
             
              <div className="max-w-[600px]">
              <div className='mb-4'>
                <h2 className="text-3xl font-bold  mb-2 max-w-[250px]">ABOUT THE</h2>
                <img src='https://i.ibb.co.com/ZRCHTwMK/Rectangle-68.png' alt="" />
            </div>
                <h2 className="text-5xl font-bold">rfBookNest</h2>
                <p className="text-gray-400 mt-4">
  Welcome to <strong>rfBookNest</strong>, your ultimate haven for book lovers, where literature comes alive, and every page tells a story. Whether you are searching for the latest <strong>bestsellers, timeless classics, or hidden literary gems</strong>, we have curated a diverse collection that caters to every reader’s taste. From gripping thrillers and heartwarming romances to thought-provoking non-fiction and inspiring self-help books, <strong>rfBookNest</strong> is designed to ignite your imagination and fuel your passion for reading.  
<br /> <br />
  Step into our world and explore an extensive collection that transcends genres, cultures, and eras. Whether you are a casual reader, an avid book collector, or someone looking to rediscover the joy of reading, <strong>rfBookNest</strong> is your go-to destination. We believe that books are more than just words on paper; they are gateways to different worlds, filled with emotions, adventures, and knowledge waiting to be unlocked.
</p>
    <Link to='/meet-our-team'>
    <button
            type="submit"
            className="mt-5 px-8 py-4  text-white font-medium border border-[#C16EFD] rounded-lg bg-[linear-gradient(105deg,_#6384FC_4.1%,_#C16EFD_54.8%,_#6384FC_92.38%)] flex items-center justify-center"
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