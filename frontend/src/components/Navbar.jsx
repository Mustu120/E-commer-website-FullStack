import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
    const { getCartCount, token, logout, setShowSearch } = useContext(ShopContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // ENHANCEMENT: Improved styling for active and hover states with a bottom border
    const navLinkClass = ({ isActive }) =>
        `pb-1 transition-colors duration-300 ${isActive
            ? "text-black font-semibold border-b-2 border-black"
            : "text-gray-600 hover:text-black"
        }`;

    return (
        // ENHANCEMENT: Added a subtle bottom border for better separation
        <div className="flex items-center justify-between py-5 px-4 sm:px-8 relative z-50 bg-white shadow-sm border-b border-gray-100">
            <Link to="/">
                <img src={assets.logo} alt="Logo" className="w-36 sm:w-44" />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden sm:flex items-center gap-8 text-base">
                <NavLink to="/" end className={navLinkClass}>Home</NavLink>
                <NavLink to="/collection" className={navLinkClass}>Collection</NavLink>
                <NavLink to="/about" className={navLinkClass}>About</NavLink>
                <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </ul>

            {/* Right-side Icons */}
            <div className="flex items-center gap-6">
                {location.pathname === "/collection" && (
                    <img
                        src={assets.search_icon}
                        alt="Search"
                        // ENHANCEMENT: Added hover effect to icons
                        className="w-5 cursor-pointer transition-transform hover:scale-110 duration-300"
                        onClick={() => setShowSearch(true)}
                    />
                )}

                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} alt="Cart" className="w-5 min-w-5 transition-transform hover:scale-110 duration-300" />
                    <p className="absolute right-[-8px] top-[-8px] w-5 h-5 flex items-center justify-center bg-black text-white text-[11px] rounded-full">
                        {getCartCount()}
                    </p>
                </Link>

                {/* Profile Icon & Dropdown */}
                <div className="relative group pt-2">
                    {token ? (
                        <>
                            <img src={assets.profile_icon} alt="Profile" className="w-6 cursor-pointer" />
                            {/* ENHANCEMENT: Added smooth transition to the dropdown */}
                            <div className="absolute right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md text-sm 
                                            invisible opacity-0 group-hover:visible group-hover:opacity-100 
                                            transition-all duration-300 transform scale-95 group-hover:scale-100">
                                <ul className="py-2">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</Link>
                                    <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Orders</Link>
                                    <hr className="my-2 border-gray-100"/>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link to="/login">
                            <img src={assets.profile_icon} alt="Login" className="w-6 cursor-pointer" />
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <img
                    src={assets.menu_icon}
                    alt="Menu"
                    className="w-6 cursor-pointer sm:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>

            {/* Mobile Menu Dropdown with Transition */}
            <div className={`absolute top-full left-0 w-full bg-white shadow-md sm:hidden z-40
                             transition-transform duration-300 ease-in-out
                             ${menuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
                <ul className="flex flex-col gap-4 p-4 text-base text-gray-800">
                    <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/collection" onClick={() => setMenuOpen(false)}>Collection</NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                    <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                    <hr/>
                    {token ? (
                        <>
                            <Link to="/profile" onClick={() => setMenuOpen(false)}>My Profile</Link>
                            <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setMenuOpen(false);
                                }}
                                className="text-left"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;

