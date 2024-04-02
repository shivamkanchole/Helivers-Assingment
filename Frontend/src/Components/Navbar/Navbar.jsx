import { useState } from "react";
import { ImMenu3, ImMenu4 } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetSearchItem } from "../../Store/SearchitemsSlice.js";


function Navbar() {
  const [toggleValue, setToggleValue] = useState(false);
  const dispatch = useDispatch();

  const changeToggleValue = () => {
    setToggleValue(!toggleValue);
  };

  const UpdateSearchStore = (e) => {
    dispatch(SetSearchItem(e.target.value));
  };


  return (
    <div className="bg-gray-800 fixed md:flex md:gap-10 lg:justify-between w-full">
      <nav className="text-white flex flex-col ">
        <div className={`flex justify-between items-center w-full h-16`}>
          <div className="flex gap-10">
            <div className="flex items-center ml-4 text-xl font-semibold sm:text-2xl sm:font-bold">
              Heliverse
            </div>

            <div className="md:hidden lg:block">
              <input
                type="search"
                placeholder="Search ..."
                onChange={UpdateSearchStore}
                className="px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mr-4 md:hidden">
            {toggleValue ? (
              <ImMenu4
                onClick={changeToggleValue}
                className="text-2xl cursor-pointer sm:text-3xl"
              />
            ) : (
              <ImMenu3
                onClick={changeToggleValue}
                className="text-2xl cursor-pointer sm:text-3xl"
              />
            )}
          </div>
        </div>
      </nav>
      <div
        className={`${
          toggleValue ? "block" : "hidden"
        } flex flex-col px-4 py-2 gap-2  sm:item-center md:flex md:flex-row md:items-center md:justify-between md:w-full lg:flex lg:justify-end lg:pr-10`}
      >
        <div className=" flex flex-col gap-1 md:flex-row md:gap-5">
          <NavLink
            to="/"
            className=" text-white hover:text-gray-300 sm:text-lg"
          >
            Home
          </NavLink>
          <NavLink
            to="/create-user"
            className=" text-white hover:text-gray-300 sm:text-lg"
          >
            Create New User
          </NavLink>
          <NavLink
            to="/create-team"
            className=" text-white hover:text-gray-300 sm:text-lg"
          >
            Create Team
          </NavLink>
          <NavLink
            to="/Teams"
            className=" text-white hover:text-gray-300 sm:text-lg"
          >
            All Teams
          </NavLink>
        </div>

        <div className=" hidden md:block lg:hidden">
          <input
            type="search"
            placeholder="Search ..."
            className="px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export { Navbar };
