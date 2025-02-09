import { FaRegStar, FaStar } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import CommonTitle from "../Common/CommonTitle";

const topRates =[
  {
    "image": "https://i.ibb.co.com/21ZGq2yd/f86d06e9-f594-4207-99a3-ab29ac5bd86d.jpg",
    "title": "The Silent Patient",
    "author": "Alex Michaelides",
    "location": "New York, USA"
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG6sHWhrqQisXiwt1JoKruwe1Kc041fwlwxRnIhrmTtK7PElmPRu2Wo5N0-PdmbXgEJgQ&usqp=CAU",
    "title": "Atomic Habits",
    "author": "James Clear",
    "location": "Ohio, USA"
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCB_iGr3CP-wOdbFRWXDZ_nd6Lidi76YbxvkD4FnzCjfLsGpykRb5ZpOsnbyKbcKHTCl8&usqp=CAU",
    "title": "The Night Circus",
    "author": "Erin Morgenstern",
    "location": "Massachusetts, USA"
  },
  {
    "image": "https://images-platform.99static.com//2Mvw5X7sEvgd3Su4FEQtbK9RHN8=/fit-in/500x500/projects-files/32/3260/326063/cab5e72a-e136-4201-88d0-64634bc88f1a.jpg",
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "location": "Rio de Janeiro, Brazil"
  }
]


const TopRatedBooks = () => {
    return (
       <div className="max-w-[90%] mx-auto ">
        <CommonTitle title={`Top Rated Books`}/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {
          topRates?.map((rate,index)=><div key={index} className="relative">
          <img className="w-full h-[350px] rounded-xl" src={rate?.image} alt="" />
          <div className="absolute top-0 m-5 ">
            <div className="flex gap-1">
              <FaStar className="text-xl text-[#FFD700]" />
              <FaStar className="text-xl text-[#FFD700]" />
              <FaStar className="text-xl text-[#FFD700]" />
              <FaStar className="text-xl text-[#FFD700]" />
              <FaRegStar className="text-xl text-[#FFD700]" />
            </div>
          </div>
          <div className="absolute end-0 top-0">
            <GiSelfLove className="text-2xl m-5 text-white" />
          </div>
          <div className="absolute bottom-[1px] pl-5 bg-black w-full py-5 text-white opacity-60 rounded-b-xl">
          <header className="">
            <h3 className="text-xl font-bold ">{rate?.title}</h3>
            <h3 className=" font-bold ">{rate?.author}</h3>
            <p className="">{rate?.location}</p>
          </header>
          </div>
           </div>)
          }
         
       </div>
       </div>
    );
};

export default TopRatedBooks;