import { useState } from "react";
import ProceedToBuyModal from "./ProceedToBuyModal";
import { BookData } from "../../types/dataTypes";

interface ProceedToBuyProps {
  bookData: BookData;
}


const ProceedToBuy = ({ bookData }: ProceedToBuyProps) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const numberOfBooks = bookData.numberOfBooks; 
  const discount = bookData.bookDiscount; 
  const price = Number(bookData.price); 

  // Calculate the total price before discount
  const totalPrice = numberOfBooks * price;

  // Calculate discount amount
  const discountAmount = (discount / 100) * totalPrice;

  // Final price after discount
  const finalPrice = totalPrice - discountAmount;

//   close modal 
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-3 text-sm font-medium transition text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
      >
        Proceed To Buy
      </button>

      {/* Modal */}
      <ProceedToBuyModal
        isOpen={isOpen}
        closeModal={closeModal}
        productInfo={{
          ...bookData,
          price:finalPrice, // Send final price to the modal
        }}
      />
    </div>
  );
};

export default ProceedToBuy;
