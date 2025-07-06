// components/Footer.tsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";

const Footer = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold mb-3">NextGenWrites</h1>
          <p className="text-sm text-gray-400">
            Stories, tech, and thoughts from the next generation of writers.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">Explore</h2>
          <NavLink to="/" className="text-gray-400 hover:text-white transition">
            Home
          </NavLink>
          <NavLink to="/story" className="text-gray-400 hover:text-white transition">
            Our Story
          </NavLink>
          <NavLink to="/blog" className="text-gray-400 hover:text-white transition">
            Blogs
          </NavLink>
          <NavLink to="/about" className="text-gray-400 hover:text-white transition">
            About
          </NavLink>
          <NavLink to="/contact-us" className="text-gray-400 hover:text-white transition">
            Contact Us
          </NavLink>
          {!loading && isLoggedIn ? (
            <NavLink to="/blog-view" className="text-gray-400 hover:text-white transition">
              Create Blogs
            </NavLink>
          ) : !loading ? (
            <span className="text-gray-600 cursor-not-allowed">Create Blogs</span>
          ) : null}
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NextGenWrites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
