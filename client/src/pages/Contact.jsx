import React, { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    // Scroll to top of the page on component mount
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-6 bg-gray-100 mt-20">
      <h2 className="text-4xl font-semibold text-center ">
        WE ARE HERE FOR YOU
      </h2>
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-gray-700 mx-48 mb-6">
          At Sangwan Hotel, we take our customers seriously. Do you have any inquiries, complaints, or requests? Please forward it to our support desk, and we will get back to you as soon as possible.
        </p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <p className="text-lg mb-2">J522+JFX, Birhi, Birhi Kalan, Haryana 127026</p>
          <a
            href="https://maps.app.goo.gl/C1sZkdyepSHS2QRy7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View map →
          </a>
          <div className="mt-4">
            <p className="text-lg">Phone: +91 9813167873</p>
            <p className="text-lg">Email: sangwanhotel@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Write your message"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.9075658055444!2d76.14821807375115!3d28.60254968544482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39128dd48c82f0e5%3A0x874e6fa8a797ff43!2sSurender%20Kumar%20S%2Fo%20Chand%20Ram!5e0!3m2!1sen!2sin!4v1745512867402!5m2!1sen!2sin"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
