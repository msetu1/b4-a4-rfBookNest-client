import CommonBanner from "../../components/Common/CommonBanner";
import ContactSection from "../../components/Home/ContactSection";
import TouchSection from "../../components/Home/TouchSection";

const ContactUs = () => {
    return (
        <div>
            <CommonBanner title={`Stay Connected in Our Bookish Nest!`} links={`Contacts`}/>
            <div className="max-w-7xl mx-auto">
                <ContactSection/>
                <TouchSection/>
            </div>
        </div>
    );
};

export default ContactUs;