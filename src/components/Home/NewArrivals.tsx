
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommonTitle from "../Common/CommonTitle";
const books = [
  { 
    id: 1, 
    title: "The Great Adventure", 
    author: "John Doe", 
    price: "$20", 
    image: "https://wipf-stock-us.imgix.net/covers/9798385231652.jpg?auto=format&w=298",
    description: "An exciting journey through uncharted lands filled with surprises."
  },
  { 
    id: 2, 
    title: "Mystery of the Lost", 
    author: "Jane Smith", 
    price: "$25", 
    image: "https://m.media-amazon.com/images/I/715Z7he2Z2L._AC_UF1000,1000_QL80_.jpg",
    description: "A thrilling tale of secrets, mysteries, and unexpected discoveries."
  },
  { 
    id: 3, 
    title: "Life in the Stars", 
    author: "Sam Taylor", 
    price: "$18", 
    image: "https://i.ibb.co.com/8gpH4BJ3/deuteronomy.webp",
    description: "Explore the cosmos and uncover life beyond our planet."
  },
  { 
    id: 4, 
    title: "Secrets Unveiled", 
    author: "Emily Clark", 
    price: "$22", 
    image: "https://www.shutterstock.com/image-vector/islamic-cover-book-unique-design-260nw-2198874383.jpg",
    description: "A captivating story of hidden truths and unexpected revelations."
  }
];

const NewArrivals = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-[90%] mx-auto my-16 border">
      <CommonTitle title={`New Arrivals & Best Sellers`} />
      
      {/* Carousel Section */}
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className="p-4 ">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden ">
              <div className=" flex items-center  justify-center
              ">
              <img className="w-[210px] h-[240px] object-cover" src={book.image} alt={book.title} />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="my-2 text-gray-600">{book?.description}</p>
                <p className="mt-2 text-xl text-end font-bold text-blue-600">{book.price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
