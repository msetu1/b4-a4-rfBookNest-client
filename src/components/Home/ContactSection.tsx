import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";

const ContactSection = () => {
  return (
    <div className="my-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Headquarters */}
        <div className="hover:bg-black hover:bg-gradient-to-br from-[#6a00f4] via-transparent to-purple-500 border flex flex-col lg:flex-row hover:text-white p-10 items-center gap-4">
          <div className="bg-white p-3">
            <IoLocationOutline className="text-4xl text-red-600 " />
          </div>
          <div>
            <h2 className="uppercase text-2xl font-bold mb-3">HEADQUARTERS</h2>
            <div className="pr-56">
              <div className="divider divider-error"></div>
            </div>
            <p className="text-gray-400 hover:text-white text-xl mt-3">
              123 BookNest Avenue NY 10001, USA
            </p>
          </div>
        </div>

        {/* Email Contact */}
        <div className="hover:bg-black hover:bg-gradient-to-br from-[#6a00f4] via-transparent to-purple-500 border flex flex-col lg:flex-row hover:text-white p-10 items-center gap-4">
          <div className="bg-white p-3">
            <AiOutlineMail className="text-4xl text-red-600 " />
          </div>
          <div>
            <h2 className="uppercase text-2xl font-bold mb-3">MAIL US 24/7</h2>
            <div className="pr-56">
              <div className="divider divider-error"></div>
            </div>
            <p className="text-gray-400 hover:text-white text-xl mt-3">
              support@booknest.com
            </p>
          </div>
        </div>

        {/* Phone Contact */}
        <div className="hover:bg-black hover:bg-gradient-to-br from-[#6a00f4] via-transparent to-purple-500 border flex flex-col lg:flex-row hover:text-white p-10 items-center gap-4">
          <div className="bg-white p-3">
            <FiPhoneCall className="text-4xl text-red-600 " />
          </div>
          <div>
            <h2 className="uppercase text-2xl font-bold mb-3">CALL US</h2>
            <div className="pr-56">
              <div className="divider divider-error"></div>
            </div>
            <p className="text-gray-400 hover:text-white text-xl mt-3">
              +1 (800) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
