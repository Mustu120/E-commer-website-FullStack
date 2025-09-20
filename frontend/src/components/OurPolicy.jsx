import React from 'react';
import { assets } from '../assets/assets'; // <-- keep it consistent (if assets is a named export)

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      
      {/* Easy Exchange Policy */}
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="Exchange Icon" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer a hassle-free exchange policy</p>
      </div>

      {/* Return Policy */}
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="Return Icon" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">Return within 7 days of purchase</p>
      </div>

      {/* Fast Delivery */}
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="Support Icon" />
        <p className="font-semibold">Fast Delivery</p>
        <p className="text-gray-400">Get your products delivered quickly</p>
      </div>

    </div>
  );
};

export default OurPolicy;
