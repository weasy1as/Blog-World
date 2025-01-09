import { signOut } from "next-auth/react";
import React from "react";
import { TbWorldSearch } from "react-icons/tb";
const Navbar = () => {
  return (
    <div className="bg-blue-300 flex justify-between p-3">
      <div className="flex justify-center items-center gap-5">
        <TbWorldSearch size={50} />
        <a href="/" className="text-xl font-bold">
          Blog World
        </a>
      </div>
      <div>
        <ul className="flex gap-4 font-bold justify-center items-center text-[18px]">
          <li>
            <a className="hover:underline" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="hover:underline" href="/createPost">
              Create post
            </a>
          </li>
          <li>
            <a className="hover:underline" href="/myPosts">
              My posts
            </a>
          </li>
          <li>
            {" "}
            <button
              className=" bg-red-500 rounded-xl p-2"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
