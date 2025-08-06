import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Sidebar({ statusFilter, setStatusFilter }) {
  const [showMenu, setShowMenu] = useState(false);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showMenu]);

  const handleFilterClick = (status) => {
    setStatusFilter(status);
    setShowMenu(false); // Close sidebar on selection
  };

  return (
    <>
      {/* Hamburger Button (Mobile Only) */}
      <div className="md:hidden p-4">
        <GiHamburgerMenu
          size={28}
          onClick={() => setShowMenu(true)}
          className="cursor-pointer"
          aria-label="Open Sidebar Menu"
        />
      </div>

      {/* Overlay Backdrop (Mobile Only) */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-100 p-6 z-50 transform transition-transform duration-300
          ${showMenu ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* Close Button (Mobile Only) */}
        <div className="flex justify-end md:hidden mb-4">
          <IoClose
            size={28}
            onClick={() => setShowMenu(false)}
            className="cursor-pointer"
            aria-label="Close Sidebar Menu"
          />
        </div>

        <h2 className="text-xl font-bold mb-6">Filter Blogs</h2>
        {['All', 'Published', 'Draft'].map(status => (
          <button
            key={status}
            onClick={() => handleFilterClick(status)}
            className={`block w-full text-left px-2 py-2 rounded-md mb-2 ${
              statusFilter === status
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
