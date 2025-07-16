import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

function Sidebar({ statusFilter, setStatusFilter }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Hamburger menu - visible on mobile only */}
      <div className='md:hidden p-4'>
        <GiHamburgerMenu size={28} onClick={() => setShowMenu(prev => !prev)} className="cursor-pointer" />
      </div>

      {/* Sidebar - always visible on md+, toggle on mobile */}
      <div className={`bg-gray-100 p-4 w-60  md:block ${showMenu ? 'block' : 'hidden'} fixed md:static h-screen z-10`}>
        <h2 className="text-xl font-bold mb-4">Filter Blogs</h2>
        {['All', 'Published', 'Draft'].map(status => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setShowMenu(false); 
            }}
            className={`block w-full text-left mb-2 cursor-pointer mt-10  ${
              statusFilter === status ? '' : ' text-black'
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
