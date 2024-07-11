import loader from "/giphy.webp";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[60%]" src={loader} alt="" />
    </div>
  );
};

export default Loading;
