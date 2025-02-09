import { useState } from "react";

const faqs = [
    {
      question: "What types of books do you sell?",
      answer:
        "We offer a wide range of books including fiction, non-fiction, academic textbooks, e-books, and more, covering various genres and topics.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes, we offer free shipping on select orders. Check the shipping details during checkout for more information.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is dispatched, you will receive a tracking number via email to track your order's delivery status.",
    },
    {
      question: "Can I return a book?",
      answer:
        "Yes, we accept returns within 30 days of purchase, provided the book is in its original condition. Please visit our returns page for more details.",
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes, we offer gift cards that can be used to buy books or merchandise from our store. You can purchase them on our website.",
    },
    {
      question: "How can I make a payment?",
      answer:
        "We accept various payment methods including credit/debit cards, PayPal, and other secure online payment options.",
    },
   
   
  ];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion =  (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border my-16 max-w-[90%] mx-auto">
      {/* Section Title */}

      <div className="flex flex-col items-center gap-10 md:flex-row ">
        {/* Left Side Menu */}

        <div className=" w-[50%] space-y-4">
            <div className="flex items-center justify-between">
                <div>
            <div className='mb-8'>
                <h2 className="text-3xl font-bold  mb-4 ">Got Questions? <br /> We have got Answers</h2>
                <img src='https://i.ibb.co.com/ZRCHTwMK/Rectangle-68.png' alt="" />
            </div>

            <div className="space-y-6">
                <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
                • Book Collection
                </div>
                <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
                • Shipping & Delivery
                </div>
                <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
                • Returns & Refunds
                </div>
                <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
                • Payment Methods
                </div>
                <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
                • Gift Cards & Bulk Orders
                </div>
                <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
                • E-books & Audiobooks
                </div>
                <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
                • Customer Support
                </div>
            </div>
                </div>
                <div className="h-[500px] mr-24 py-16">
                    <div className="w-[2px] h-full bg-gray-500"></div>
                </div>
            </div>
        </div>

        
        {/* Right Side Accordion */}
        <div className="w-[50%]   space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700">
              <button
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg">{faq.question}</span>
                <span className="text-yellow-500">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === index && (
                <p className="text-gray-400 pb-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;