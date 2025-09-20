import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    // Prevents the default form submission behavior (page reload)
    event.preventDefault();
    console.log("Form submitted!"); // You can add your form logic here
  };

  return (
    <div className="text-center py-10 px-4">
      <h2 className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </h2>

      <p className="text-gray-400 mt-3 mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto"
      >
        <input
          className="w-full sm:flex-1 outline-none border border-gray-300 rounded-md px-4 py-3 focus:border-black transition"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          className="bg-black text-white text-xs px-10 py-4 rounded-md hover:bg-gray-800 transition"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;