import React, { useEffect } from 'react';

export default function TermsAndConditions() {
  useEffect(() => {
    // Scroll to top of the page on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-6 bg-gray-100 mt-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700">Terms and Conditions</h2>
        
        <section className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700">1. Introduction</h3>
          <p className="text-gray-600">
            Welcome to Sangwan Hotel! By booking a room with us, you agree to comply with these Terms and Conditions. 
            If you have any questions, please contact us before booking.
          </p>
        </section>

        <section className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700">2. Booking Policy</h3>
          <p className="text-gray-600">
            - All bookings must be made in advance.  
            - A valid ID and credit card are required at the time of booking.
            - Cancellations must be made 48 hours before the check-in date to receive a full refund.
          </p>
        </section>

        <section className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700">3. Payment</h3>
          <p className="text-gray-600">
            - We accept payments via credit card, debit card, and online bank transfers.
            - Full payment is required before check-in.
          </p>
        </section>

        <section className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700">4. Privacy Policy</h3>
          <p className="text-gray-600">
            - We respect your privacy and are committed to protecting your personal data.
            - For more details, please read our Privacy Policy.
          </p>
        </section>

        <section className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700">5. Hotel Responsibilities</h3>
          <p className="text-gray-600">
            - Sangwan Hotel is not responsible for any loss or damage to personal items during your stay.
            - The hotel reserves the right to refuse service or evict guests engaging in illegal activities.
          </p>
        </section>

        <section className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700">6. Contact Us</h3>
          <p className="text-gray-600">
            For any inquiries or clarifications regarding our terms and conditions, feel free to reach out to us at:
            <br />
            Email: sangwanhotel@gmail.com
            <br />
            Phone: +91 9813167873
          </p>
        </section>
      </div>
    </div>
  );
}
