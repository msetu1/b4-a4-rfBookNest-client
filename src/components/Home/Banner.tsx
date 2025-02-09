// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide1 from "../Slide/Slide1";
import Slide2 from "../Slide/Slide2";
import Slide3 from "../Slide/Slide3";
import Slide4 from "../Slide/Slide4";

const Banner = () => {
    return (
        <div className="">
            <div className=" w-full">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                <Slide1 />
                </SwiperSlide>
                <SwiperSlide>
                <Slide2 />
                </SwiperSlide>
                <SwiperSlide>
                <Slide3 />
                </SwiperSlide>
                <SwiperSlide>
                <Slide4 />
                </SwiperSlide>
            </Swiper>
            </div>
        </div>
    );
};

export default Banner;