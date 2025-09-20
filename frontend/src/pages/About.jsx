import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='min-h-screen'>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      
      <div className='my-10 flex flex-col md:flex-row gap-16 px-4 md:px-8 max-w-6xl mx-auto'>
        <img 
          className='w-full md:max-w-[450px] rounded-lg shadow-md' 
          src={assets.about_img} 
          alt="About Forever" 
        />
        
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='leading-relaxed'>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. 
            Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, 
            and purchase a wide range of products from the comfort of their homes.
          </p>
          
          <p className='leading-relaxed'>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that 
            cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer 
            an extensive collection sourced from trusted brands and suppliers.
          </p>
          
          <h3 className='text-gray-800 font-bold text-xl mt-4'>Our Mission</h3>
          
          <p className='leading-relaxed'>
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated 
            to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to 
            delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-2xl text-center py-8'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 px-4 md:px-8 max-w-6xl mx-auto'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-lg'>Quality Assurance:</b>
          <p className='text-gray-600'>
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-lg'>Convenience:</b>
          <p className='text-gray-600'>
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-lg'>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  )
}

export default About