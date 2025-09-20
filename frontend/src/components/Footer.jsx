import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    // The main footer container with an ID for anchor links
    <div id='footer' className='text-gray-700 bg-gray-50 py-12 px-5 sm:px-10 md:px-20'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        
        {/* Left Section: Spans two columns on larger screens */}
        <div className='md:col-span-2 pr-8'>
          <img src={assets.logo} className='mb-5 w-32' alt='Company Logo' />
          <p className='text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
          {/* You can add social media icons here if needed */}
        </div>
        
        {/* Middle Section: Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='cursor-pointer hover:text-black'>Home</li>
            <li className='cursor-pointer hover:text-black'>About us</li>
            <li className='cursor-pointer hover:text-black'>Delivery</li>
            <li className='cursor-pointer hover:text-black'>Privacy policy</li>
          </ul>
        </div>
        
        {/* Right Section: Contact Information */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-9727323340</li>
            <li>contact@forevercompany.com</li>
          </ul>
        </div>
      </div>
      
      <hr className='my-8 border-gray-300' />
      
      <p className='text-center text-gray-500 text-sm'>
        Copyright 2025 © YourWebsite.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;