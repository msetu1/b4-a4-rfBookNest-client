import About from "../../components/Home/About";
import Banner from "../../components/Home/Banner";
import DiscountSection from "../../components/Home/DiscountSection";
import FAQSection from "../../components/Home/FAQSection";
import NewArrivals from "../../components/Home/NewArrivals";
import TopRatedBooks from "../../components/Home/TopRatedBooks";
const Home = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <DiscountSection/>
            <NewArrivals/>
            <FAQSection/>
            <TopRatedBooks/>
        </div>
    );
};

export default Home;