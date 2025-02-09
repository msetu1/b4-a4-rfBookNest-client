import { Link } from "react-router-dom";

interface CommonBannerProps {
  title: string;
  links: string;
}

const CommonBanner: React.FC<CommonBannerProps> = ({ title, links }) => {
  return (
    <div
      className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[450px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://www.mmitnetwork.com/wp-content/uploads/2021/08/team-banner.png)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 pt-[160px] text-white  h-full px-4">
        <div className="text-center md:text-left max-w-[90%] mx-auto">
          <h1 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h1>
          <h2 className="text-lg md:text-xl font-semibold">
            <Link to="/" className="underline hover:text-gray-300 transition">
              Home
            </Link>{" "}
            / {links}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
