import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const TouchSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br bg-black from-[#6a00f4] via-transparent to-purple-500 text-white p-8 lg:p-10 rounded-xl shadow-lg">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            className="max-h-[350px] w-auto object-contain"
            src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-download-in-svg-png-gif-file-formats--call-logo-customer-service-support-onboarding-pack-business-illustrations-4849052.png?f=webp"
            alt="Contact Illustration"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">GET IN TOUCH</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-semibold text-sm mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                className="w-full p-2 rounded-lg bg-[#1B1B31] border border-gray-700 focus:outline-none"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-semibold text-sm mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                className="w-full p-2 rounded-lg bg-[#1B1B31] border border-gray-700 focus:outline-none"
                required
              />
            </div>

            {/* Phone and Services Selection */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Phone Field */}
              <div className="w-full">
                <label htmlFor="phone" className="block font-semibold text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your number..."
                  className="w-full p-2 rounded-lg bg-[#1B1B31] border border-gray-700 focus:outline-none"
                  required
                />
              </div>

              {/* Services Selection */}
              <div className="w-full">
                <label htmlFor="service" className="block font-semibold text-sm mb-2">Which are you looking for support in?</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-[#1B1B31] border border-gray-700 focus:outline-none cursor-pointer"
                  required
                >
                  <option value="">Choose service</option>
                  <option value="support">Support</option>
                  <option value="inquiry">Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block font-semibold text-sm mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full p-2 rounded-lg bg-[#1B1B31] border border-gray-700 focus:outline-none"
                rows={3}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full  text-center  py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TouchSection;
