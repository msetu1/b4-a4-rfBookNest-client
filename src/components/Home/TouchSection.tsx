
const TouchSection = () => {
  
  return (
    <div className="max-w-7xl mx-auto bg-black bg-gradient-to-br from-[#6a00f4] via-transparent to-purple-500 ">
      <div className="flex flex-col lg:flex-row items-center text-white gap-4 p-16">
        <div className="w-full lg:w-[50%]">
          <div style={{ height: "500px", width: "100%" }}>
            <img className="h-full" src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-download-in-svg-png-gif-file-formats--call-logo-customer-service-support-onboarding-pack-business-illustrations-4849052.png?f=webp" alt="" />
          </div>
        </div>
        <div className="w-full lg:w-[50%] ">
          <h2 className="uppercase lg:text-4xl font-bold mb-5">GET IN TOUCH</h2>
          <div className="flex flex-col gap-5">
          <div className="w-full">
              <label
                  htmlFor="services"
                  className="block text-white mb-2 font-semibold text-xs"
                >
                 Name
                </label>
              <input
              type="text"
              name="name"
              id=""
              placeholder="Enter your name..."
              className="bg-[#1B1B31] rounded-lg border border-gray-700 p-3 w-full"
            />
          </div>
            <div className="w-full">
              <label
                  htmlFor="services"
                  className="block text-white mb-2 font-semibold text-xs"
                >
                 Email
                </label>
              <input
              type="text"
              name="email"
              id=""
              placeholder="Enter your email..."
              className="bg-[#1B1B31] rounded-lg border border-gray-700 p-3 w-full"
            />
              </div>
            <div className="flex items-center justify-between gap-3">
              <div className="w-full">
              <label
                  htmlFor="services"
                  className="block text-white mb-2 font-semibold text-xs"
                >
                 Phone
                </label>
              <input
              type="text"
              name="phone"
              id=""
              placeholder="Enter your number..."
              className="bg-[#1B1B31] rounded-lg border border-gray-700 p-3 w-full"
            />
              </div>
              <div className="w-full">
                <label
                  htmlFor="services"
                  className="block text-white mb-2 font-semibold text-xs"
                >
                  Which are You Looking for Support in?
                </label>
                <select
                  id="services"
                  className="bg-[#1B1B31] rounded-lg border border-gray-700 p-3 w-full"
                >
                  <option value="">Choose services</option>
                  <option value="support">Support</option>
                  <option value="inquiry">Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
             
            <textarea
              name=""
              id=""
              cols="30"
              rows="3"
              placeholder="Write Your Message"
              className="bg-[#1B1B31] rounded-lg border border-gray-700 p-3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-5 px-8 py-4  text-white font-medium border border-[#C16EFD] rounded-lg bg-[linear-gradient(105deg,_#6384FC_4.1%,_#C16EFD_54.8%,_#6384FC_92.38%)] flex items-center justify-center"
          >
            <p>Send Message</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TouchSection;
