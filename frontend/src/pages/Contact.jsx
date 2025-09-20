import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='min-h-screen'>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 px-4 md:px-8 max-w-6xl mx-auto'>
        <img 
          className='w-full md:max-w-[480px] rounded-lg shadow-md' 
          src={assets.contact_img} 
          alt="Contact Forever" 
        />
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
            123 Tech Park Road<br />
            Sector 62, Gandhinagar 201309<br />
            India
          </p>
          
          <p className='text-gray-500'>
            Tel: +91 11 5555 0132<br />
            Email: admin@forever.com
          </p>
          
          <p className='font-semibold text-xl text-gray-600 mt-6'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          
          <button className='border border-black px-8 py-4 hover:bg-black hover:text-white transition duration-300'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* NewsletterBox Section */}
      <NewsletterBox />
    </div>
  )
}

export default Contact