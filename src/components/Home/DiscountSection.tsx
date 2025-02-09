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
      <div className="flex justify-between items-center gap-10">
        <div className="w-[50%] border">
          <div className='mb-4'>
                <h2 className="text-3xl font-bold  mb-4 ">Limited Time Offer!</h2>
                <img src='https://i.ibb.co.com/ZRCHTwMK/Rectangle-68.png' alt="" />
            </div>
          <p className="mt-2 text-[16px] font-semibold">Don’t miss out on our 50% discount on all fiction books! For a limited time only, you can grab your favorite novels, including mystery, romance, fantasy, and more, at half the price. This is the perfect opportunity to expand your reading collection without breaking the bank!

Whether you're looking for a thrilling crime novel, a captivating romance, or a classic piece of literature, our curated selection has something for every reader. All of our fiction books are handpicked to offer you the best in storytelling, from well-loved bestsellers to hidden gems you won't want to miss.
<br /> <br />
This offer also includes free shipping on all orders, making it even easier to treat yourself to a new book (or two). But hurry—this limited-time offer is only available until [expiration date]. Once it’s gone, the prices will go back to normal, so be sure to take advantage while you can!

Add your favorite books to the cart and check out quickly before the clock runs out. It’s the perfect time to catch up on your reading or gift a book to someone special.

Shop now and enjoy the magic of reading at an unbeatable price!</p>
          <p className="mt-4 text-xl">Offer ends in: <span className="font-bold">{timeLeft}</span></p>
          <a
            href="#"
            className="mt-6 inline-block bg-yellow-500 text-black py-2 px-6 rounded-lg hover:bg-yellow-600 transition"
          >
            Shop Now
          </a>
        </div>
        <div className="w-[50%] flex items-center justify-center border">
          <img
            src="https://dcbookstore.com/uploads/product/images/37016592419673-WhatsApp-Image-2024-11-18-at-3.03.55-PM-1-.jpeg"
            alt="Book offer"
            className="w- h-[500px] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;
