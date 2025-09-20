import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets'; // ✅ move up

const Sidebar = () => {
  const navLinkClass = 'flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2.5 rounded-l-md cursor-pointer';

  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-200'>
      <div className='pt-12 pl-[15%] flex flex-col gap-5'>
        <NavLink
          to='/add'
          className={navLinkClass}
          style={({ isActive }) => isActive ? { backgroundColor: '#fff0ed', borderColor: 'tomato' } : {}}
        >
          <img src={assets.add_icon} alt="Add Items Icon" className='w-5 h-5' />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink
          to='/list'
          className={navLinkClass}
          style={({ isActive }) => isActive ? { backgroundColor: '#fff0ed', borderColor: 'tomato' } : {}}
        >
          <img src={assets.order_icon} alt="List Items Icon" className='w-5 h-5' />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink
          to='/orders'
          className={navLinkClass}
          style={({ isActive }) => isActive ? { backgroundColor: '#fff0ed', borderColor: 'tomato' } : {}}
        >
          <img src={assets.order_icon} alt="Orders Icon" className='w-5 h-5' />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
