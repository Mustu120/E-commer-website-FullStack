import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();

  // Condition: Only render if user clicked search AND we are on the collection page
  if (!showSearch || location.pathname !== '/collection') {
    return null;
  }

  return (
    <div className="border-t border-b bg-gray-50 py-2 text-center flex justify-center items-center">
      {/* Search input and icon */}
      <div className="inline-flex items-center border border-gray-400 px-3 py-1 rounded-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
          className="flex-1 bg-transparent outline-none"
        />
        <img
          className="w-4 ml-2"
          src={assets.search_icon}
          alt="Search icon"
        />
      </div>

      {/* Close button */}
      <img
        onClick={() => setShowSearch(false)}
        className="w-3 ml-4 cursor-pointer"
        src={assets.cross_icon} // Ensure you have a 'cross_icon' in your assets
        alt="Close search bar"
      />
    </div>
  );
};

export default SearchBar;