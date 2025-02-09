
const HomeGradient = () => {
    return (
        <div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-transparent to-[#6a00f4] opacity-70 blur-[120px]"></div>
        </div>
    );
};

export default HomeGradient;