import Notfound from "/404.webp";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-screen w-screen object-contain" src={Notfound} alt="" />
    </div>
  );
};

export default NotFound;
