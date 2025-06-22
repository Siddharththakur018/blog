import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "../../context/authContext";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { isLoggedIn, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // Click outside to close mobile menu and dropdown
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                !event.target.closest(".mobile-menu") &&
                !event.target.closest(".hamburger-btn") &&
                !event.target.closest(".dropdown-area")
            ) {
                setIsOpen(false);
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); // or clear cookie/session
        // You can also call logout API here if needed
        navigate("/signin");
        window.location.reload(); // To reset AuthContext
    };

    return (
        <div className="bg-black text-white relative">
            <div className="w-full max-w-[1200px] mx-auto flex justify-between p-5 items-center">
                {/* Logo */}
                <div className="font-bold text-2xl">
                    <h2>NextGenWrites</h2>
                </div>

                {/* Desktop Navbar */}
                <div className="hidden md:flex space-x-6 text-lg font-semibold">
                    <NavLink to="/" className="hover:text-blue-400 transition">
                        Home
                    </NavLink>
                    <NavLink to="/story" className="hover:text-blue-400 transition">
                        Our Story
                    </NavLink>
                    <NavLink to="/blog" className="hover:text-blue-400 transition">
                        Blogs
                    </NavLink>
                    <NavLink to="/about" className="hover:text-blue-400 transition">
                        About
                    </NavLink>
                    <NavLink to="/contact-us" className="hover:text-blue-400 transition">
                        Contact Us
                    </NavLink>
                    {!loading && isLoggedIn ? (
                        <NavLink to="/create-blogs" className="hover:text-blue-400 transition">
                            Create Blogs
                        </NavLink>
                    ) : !loading ? (
                        <span className="text-gray-500 cursor-not-allowed">
                            Create Blogs
                        </span>
                    ) : null}
                </div>

                {/* Profile Icon or Initial with Dropdown */}
                <div className="relative dropdown-area">
                    {!loading && isLoggedIn && user ? (
                        <>
                            <div
                                className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-semibold cursor-pointer"
                                title={user.name}
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <NavLink to="/signin">
                            <CgProfile className="w-10 h-10 cursor-pointer" />
                        </NavLink>
                    )}
                </div>

                {/* Hamburger Button for Mobile */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-3xl cursor-pointer md:hidden hamburger-btn"
                >
                    <GiHamburgerMenu />
                </button>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-6 transform transition-transform duration-300 ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    } md:hidden mobile-menu`}
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-5 right-5 text-4xl text-white"
                    >
                        ×
                    </button>
                    <NavLink
                        to="/"
                        className="hover:text-blue-400 text-xl transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/story"
                        className="hover:text-blue-400 text-xl transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Our Story
                    </NavLink>
                    <NavLink
                        to="/blog"
                        className="hover:text-blue-400 text-xl transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Blogs
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="hover:text-blue-400 text-xl transition"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact-us"
                        className="hover:text-blue-400 text-xl transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Contact Us
                    </NavLink>
                    {!loading && isLoggedIn ? (
                        <NavLink
                            to="/create-blogs"
                            className="hover:text-blue-400 text-xl transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Create Blogs
                        </NavLink>
                    ) : !loading ? (
                        <span className="text-gray-500 cursor-not-allowed text-xl">
                            Create Blogs
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
