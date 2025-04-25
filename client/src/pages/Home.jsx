import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import abcImage from '../assets/abc.png';

const testimonials = [
  {
    quote: 'Calm, Serene, Retro – What a way to relax and enjoy',
    author: 'Mr. and Mrs. Baxter, UK',
  },
  {
    quote: 'Truly a five-star experience. The rooms, the views, the food – all excellent!',
    author: 'Raj & Neha, India',
  },
  {
    quote: 'Impeccable service and spotless rooms. Will definitely return!',
    author: 'Lisa M., Germany',
  },
  {
    quote: 'A beach escape I didn’t know I needed. The ocean view is unbeatable.',
    author: 'Daniel K., USA',
  },
];

export default function Home() {
  const scrollTargetRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    // Scroll to top of the page on component mount
    window.scrollTo(0, 0);
  }, []);
  const scrollToSection = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextTestimonial = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 300);
  };

  const prevTestimonial = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&cs=tinysrgb&w=600')`}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex items-center justify-start h-full px-10">
          <div className="text-white max-w-2xl">
            <p className="uppercase tracking-widest text-sm mb-2">Welcome To</p>
            {/* <h1 className="text-6xl font-extrabold leading-tight mb-4">SANGWAN<br />HOTEL</h1> */}
            <h1
  className="text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-blue-500  bg-clip-text text-transparent"
>
  SANGWAN<br />HOTEL
</h1>

            <p className="text-lg mb-6">
              Book your stay and enjoy luxury redefined at the most affordable rates.
            </p>
            <Link to="/booking" className="bg-yellow-400 text-black px-6 py-3 rounded font-bold hover:bg-yellow-500 transition">
              BOOK NOW
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer text-center"
          onClick={scrollToSection}
        >
          <p className="text-white text-sm bg-gray-500 px-4 py-1 rounded-full">Scroll</p>

          <div className="text-white text-2xl bg-gray-500 px-4 py-2 rounded-full animate-bounce text-center w-8 h-8 flex items-center justify-center">
  ↓
</div>

        </div> */}
      </section>

      {/* Scroll-To Section */}
      <section ref={scrollTargetRef} className="bg-white py-16 px-6">
        <h3 className="text-center text-gray-700 text-lg font-medium mb-16">
          All our room types are including complementary breakfast
        </h3>

        <div className="max-w-6xl mx-auto flex flex-col gap-20">
          {/* Block 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-blue-900 border-l-4 border-blue-700 pl-4">Luxury redefined</h3>
              <p className="text-gray-600">
                Our rooms are designed to transport you into an environment made for leisure.
                Take your mind off the day-to-day of home life and find a private paradise for yourself.
              </p>
              <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition">
                EXPLORE
              </button>
            </div>
            <div className="md:w-1/2">
              <img src={abcImage} alt="Luxury Room" className="w-full rounded-xl shadow-md" />
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-blue-900 border-l-4 border-blue-700 pl-4">Leave your worries in the sand</h3>
              <p className="text-gray-600">
                We love life at the beach. Being close to the ocean with access to endless sandy beach ensures
                a relaxed state of mind. It seems like time stands still watching the ocean.
              </p>
              <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition">
                EXPLORE
              </button>
            </div>
            <div className="md:w-1/2">
              <img src='https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=600' alt="Beach Vibes" className="w-full rounded-xl shadow-md h-[20rem] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white text-center px-6 -mb-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Testimonials</h2>
        <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <blockquote className="text-xl italic text-gray-700 mb-2">
            “{testimonials[index].quote}”
          </blockquote>
          <p className="text-sm text-gray-600 mb-6">{testimonials[index].author}</p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={prevTestimonial}
            className="bg-yellow-400 text-white font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            &lt;
          </button>
          <button
            onClick={nextTestimonial}
            className="bg-yellow-400 text-white font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
}
