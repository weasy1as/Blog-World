import { signIn } from "next-auth/react";
import React from "react";

const unauthorized = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <div className="flex flex-col justify-center items-center gap-3 w-[200px] h-[200px] rounded-xl ">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl  text-blue-500">
          401
        </h1>
        <h1 className="font-bold">You are not signed in</h1>
        <button
          className="bg-blue-300 p-2 rounded-xl hover:bg-blue-500"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default unauthorized;
