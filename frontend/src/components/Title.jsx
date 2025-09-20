import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      {/* Combined text element */}
      <p className='text-gray-500'>
        {text1} <span className='font-medium text-gray-700'>{text2}</span>
      </p>

      {/* Decorative line element */}
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  );
};

export default Title;