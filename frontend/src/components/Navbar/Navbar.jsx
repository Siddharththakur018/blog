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

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
        window.location.reload();
    };

    const navItems = [
        { label: "Home", to: "/" },
        { label: "Our Story", to: "/story" },
        { label: "Blogs", to: "/blog" },
        { label: "About", to: "/about" },
        { label: "Contact Us", to: "/contact-us" },
    ];

    return (
        <nav className="bg-black text-white">
            <div className="max-w-[1200px] mx-auto px-4 py-5 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">NextGenWrites</div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6 text-lg font-semibold">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `transition hover:text-blue-400 ${isActive ? "text-blue-400" : ""}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    {!loading && isLoggedIn ? (
                        <NavLink to="/blog-view" className="hover:text-blue-400 transition">
                            Create Blogs
                        </NavLink>
                    ) : !loading ? (
                        <span className="text-gray-500 cursor-not-allowed">Create Blogs</span>
                    ) : null}
                </div>

                {/* Profile / Login */}
                <div className="relative dropdown-area">
                    {!loading && isLoggedIn && user ? (
                        <>
                            <div
                                className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-semibold cursor-pointer"
                                title={user.name}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
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

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-3xl md:hidden hamburger-btn"
                    aria-label="Menu"
                >
                    <GiHamburgerMenu />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/5 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-menu ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-4xl absolute top-4 right-5"
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="flex flex-col items-start p-8 gap-6 text-xl mt-12">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className="hover:text-blue-400 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    {!loading && isLoggedIn ? (
                        <NavLink
                            to="/blog-view"
                            className="hover:text-blue-400 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Create Blogs
                        </NavLink>
                    ) : !loading ? (
                        <span className="text-gray-500 cursor-not-allowed">Create Blogs</span>
                    ) : null}
                </div>
            </div>

            {/* Background overlay when menu is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
}

export default Navbar;
