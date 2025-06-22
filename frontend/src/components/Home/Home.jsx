import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext"; // Adjust path accordingly

function Home() {
  const { isLoggedIn } = useContext(AuthContext); // get login status from context

  return (
    <div className="flex flex-row justify-between h-[80vh] w-[1000px] mx-auto">
      <div className="w-1/2 flex justify-center items-center flex-col">
        <div className="text-left font-bold">
          <div className="text-4xl">Discover Stories. Share Ideas. Unlock Possibilities.</div>
        </div>
        <div className="text-left m-2">
          <div className="text-xl">Your journey to smarter content starts here.</div>
        </div>
        <NavLink
          to={isLoggedIn ? "/story" : "/signin"}
          className="border-2 rounded-4xl p-2 m-2 bg-black text-white hover:bg-white hover:text-black transition duration-700 cursor-pointer"
        >
          <button className="cursor-pointer w-50">Start Reading</button>
        </NavLink>
      </div>
      <div className="w-1/2 flex justify-end items-end">
        <img
          className="h-[500px] w-[500px] object-contain"
          src="image.png"
          alt="image"
        />
      </div>
    </div>
  );
}

export default Home;
