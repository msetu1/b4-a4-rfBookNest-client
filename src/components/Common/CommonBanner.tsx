import { Link } from "react-router-dom";

const CommonBanner = () => {
  return (
    <div
      className="relative min-h-[450px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://www.mmitnetwork.com/wp-content/uploads/2021/08/team-banner.png)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 text-center text-white">
        <div className="pt-[160px] max-w-[90%] mx-auto">
          <div className="text-left ">
            <h1 className="mb-5 text-4xl font-bold">Welcome to BookNest</h1>
            <h2 className="text-xl font-bold">
              <Link to="/" className="underline">
                Home
              </Link>{" "}
              / About
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
