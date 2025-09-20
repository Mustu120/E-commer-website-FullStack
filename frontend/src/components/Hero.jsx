import React from 'react'
import { assets } from '../assets/assets' // make sure path is correct

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-300 rounded-lg overflow-hidden">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center px-6 py-10 sm:py-0 text-center sm:text-left">
        <div className="text-[#414141]">
          {/* Tagline */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          {/* Heading */}
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl font-semibold leading-relaxed">
            Latest Arrivals
          </h1>

          {/* Call to Action */}
          <div className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer hover:opacity-80">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <img
          className="w-[80%] sm:w-[70%] lg:w-[60%] object-contain"
          src={assets.hero_img}
          alt="Hero"
        />
      </div>
    </div>
  )
}

export default Hero
