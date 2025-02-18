import { useState } from "react";
import CommonBanner from "../../components/Common/CommonBanner";

const Gallery = () => {
  const [images] = useState([
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    "http://res.cloudinary.com/dn7oeugls/image/upload/v1738240277/eubgzhvvxswjdctkhyid.jpg",
    "https://images.pexels.com/photos/279222/pexels-photo-279222.jpeg",
    "https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg",
    "https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg",
    "https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg"
  ]);

  return (
    <div>
      <CommonBanner title="Captivating Moments: A Visual Journey" links="gallery" />
      <div className="my-16 max-w-[90%] mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">Our Book Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg relative group">
            <img
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
              <p className="text-white text-lg font-semibold">BookNest Collection</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Gallery;
