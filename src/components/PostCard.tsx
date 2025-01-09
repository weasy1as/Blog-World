import React from "react";

const PostCard = ({ title, content }) => {
  return (
    <div className="shadow-xl w-[300px] h-[400px] flex flex-col items-center gap-2">
      <h1 className="font-bold text-2xl">{title}</h1>
      <div>{content}</div>
    </div>
  );
};

export default PostCard;
