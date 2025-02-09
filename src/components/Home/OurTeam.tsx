import CommonBanner from "../Common/CommonBanner";

const ourTeam = [
  {
    image: 'https://demo.fieldthemes.com/bookshop/demo1/img/cms/team-1.jpg',
    name: 'Halie',
    role: 'CEO & Co-Founder'
  },
  {
    image: 'https://demo.fieldthemes.com/bookshop/demo1/img/cms/team-2.jpg',
    name: 'Johnson',
    role: 'Customer Care'
  },
  {
    image: 'https://demo.fieldthemes.com/bookshop/demo1/img/cms/team-3.jpg',
    name: 'Tony Nast',
    role: 'Developer'
  },
  {
    image: 'https://demo.fieldthemes.com/bookshop/demo1/img/cms/team-4.jpg',
    name: 'Hante Design',
    role: 'Designer'
  }
];

const OurTeam = () => {
  return (
    <div>
      <CommonBanner title={`Welcome to BookNest`} links={`About`} />
      <div className="my-16 max-w-[90%] mx-auto">
        {/* Our mission */}
        <div className="flex flex-col-reverse lg:flex-row md:flex-col-reverse items-center gap-10">
          <div className="w-full ml:w-[50%]">
            <img className="w-full hover:opacity-70" src="https://media.istockphoto.com/id/1129332568/photo/successful-group-of-business-people-at-work-in-office.jpg?s=612x612&w=0&k=20&c=dA-p1qJpQc0KHJ5wZQQDDbLDir74TIV1wmeOf5hhAuQ=" alt="" />
          </div>
          <div className="w-full ml:w-[50%]">
            <div className='mb-4'>
              <h2 className="text-3xl font-bold  mb-2">Our mission</h2>
              <img src='https://i.ibb.co.com/ZRCHTwMK/Rectangle-68.png' alt="" />
            </div>
            <p className="text-lg">At BookNest, our mission is to connect people with the transformative power of books. We believe that books have the ability to inspire, educate, and entertain, shaping lives in ways that go beyond the written word. Our goal is to create a space where readers of all ages and interests can discover new worlds, expand their horizons, and fuel their imaginations.
              <br /> <br />
              We are committed to providing a wide selection of high-quality books across genres, ensuring that everyone can find something that speaks to them. Whether you’re a lifelong reader or new to the world of books, BookNest is here to help you find your next great read. Beyond our curated book selection, we also aim to create a welcoming, user-friendly experience that makes book shopping enjoyable and convenient.</p>
          </div>
        </div>

        {/* Meet our team */}
        <div className="my-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of <br /> classical Latin literature from 45 BC, making it over 2000 years old.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {ourTeam?.map((team, index) => (
              <div key={index} className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200 group">
                {/* Icon */}
                <figure className="p-6 pb-0 relative">
                  <img
                    className="rounded-full transition-all duration-300 ease-in-out hover:opacity-80 aspect-video object-cover group-hover:scale-110"
                    src={team?.image}
                    alt=""
                  />
                </figure>
                {/* Body */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-medium text-slate-700">{team?.name}</h3>
                  <p>{team?.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our service */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full ml:w-[50%]">
            <div className='mb-4'>
              <h2 className="text-3xl font-bold  mb-2 ">Our service</h2>
              <img src='https://i.ibb.co.com/ZRCHTwMK/Rectangle-68.png' alt="" />
            </div>
            <p className="text-lg">At BookNest, we are dedicated to offering more than just books – we provide an exceptional, personalized experience for every book lover. Our services are designed to make your journey through the world of literature effortless and enjoyable.
              <br /> <br />
              Wide Selection of Books: We offer a vast range of books across multiple genres, from bestsellers to hidden gems, catering to all age groups and interests. Whether you're into fiction, non-fiction, mystery, self-help, or children's books, we've got something for everyone.

              Personalized Recommendations: We understand that finding the right book can be overwhelming. Our team is here to provide personalized recommendations based on your preferences, helping you discover your next great read with ease.</p>
          </div>
          <div className="w-full ml:w-[50%]">
            <img className="w-full hover:opacity-70" src="https://static.wixstatic.com/media/0ded9f_a50fe0fa171f4697b3a50c7fc13f824c~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0ded9f_a50fe0fa171f4697b3a50c7fc13f824c~mv2.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
