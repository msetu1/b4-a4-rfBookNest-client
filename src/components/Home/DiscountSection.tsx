import { useState, useEffect } from 'react';

const DiscountSection = () => {
  // Time left for the discount (e.g., 3 hours left)
  const [timeLeft, setTimeLeft] = useState('03:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const deadline = new Date().setHours(23, 59, 59); // Set to the end of the day
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft('Expired');
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-xl shadow-lg text-white border my-16 max-w-[90%] mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Section - Text */}
        <div className="w-full lg:w-[50%]">
          <div className="mb-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">Limited Time Offer!</h2>
            <img
              src="https://i.ibb.co.com/ZRCHTwMK/Rectangle-68.png"
              alt="Decorative Line"
              className="mx-auto lg:mx-0"
            />
          </div>
          <p className="mt-2 text-sm md:text-[16px] font-semibold text-center lg:text-left">
            Don’t miss out on our <strong>50% discount</strong> on all fiction books! 
            <br /><br />
            Whether you're looking for a thrilling crime novel, a captivating romance, or a classic piece of literature, our curated selection has something for every reader.
            <br /><br />
            This offer also includes **free shipping** on all orders! But hurry—this limited-time offer is only available until **[expiration date]**.
            <br /><br />
            Add your favorite books to the cart before the clock runs out! It’s the perfect time to catch up on your reading or gift a book to someone special.
          </p>
          <p className="mt-4 text-xl text-center lg:text-left">
            Offer ends in: <span className="font-bold">{timeLeft}</span>
          </p>
          <div className="flex justify-center lg:justify-start">
            <a
              href="#"
              className="mt-6 inline-block bg-yellow-500 text-black py-2 px-6 rounded-lg hover:bg-yellow-600 transition"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full lg:w-[50%] flex items-center justify-center">
          <img
            src="https://dcbookstore.com/uploads/product/images/37016592419673-WhatsApp-Image-2024-11-18-at-3.03.55-PM-1-.jpeg"
            alt="Book offer"
            className="w-full md:w-[80%] lg:w-auto h-[350px] md:h-[450px] lg:h-[500px] rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;
