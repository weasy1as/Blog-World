import React from "react";

const PostCard = ({ title, content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-80 h-auto flex flex-col items-center p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 text-sm text-center">{content}</p>
    </div>
  );
};

export default PostCard;
