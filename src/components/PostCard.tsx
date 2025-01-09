const PostCard = ({ title, content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg w-full max-h-96 overflow-hidden flex flex-col items-center p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-700 text-sm text-center overflow-hidden text-ellipsis">
        {content}
      </p>
    </div>
  );
};

export default PostCard;
