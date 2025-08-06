import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen max-w-[1000px] mx-auto px-4 py-8">
      <div className="w-full md:w-1/2 flex justify-center items-center flex-col text-center md:text-left mb-8 md:mb-0">
        <div className="font-bold">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Discover Stories. Share Ideas. Unlock Possibilities.
          </h1>
        </div>
        <div className="mt-4">
          <p className="text-lg sm:text-xl">
            Your journey to smarter content starts here.
          </p>
        </div>
        <NavLink
          to={isLoggedIn ? "/story" : "/signin"}
          className="mt-6 inline-block border-2 rounded-full px-6 py-2 bg-black text-white hover:bg-white hover:text-black transition duration-700"
        >
          Start Reading
        </NavLink>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          className="h-[300px] sm:h-[400px] md:h-[500px] w-auto object-contain"
          src="image.png"
          alt="image"
        />
      </div>
    </div>
  );
}

export default Home;
