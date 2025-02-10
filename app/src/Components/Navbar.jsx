import { FaWorm } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="p-4 relative z-10">
      <h1 className="text-2xl flex items-center font-bold gap-2 text-sky-600">
        <FaWorm />
        <span>
          Book
          <span className="text-red-500">
            Worm
          </span>
        </span>
      </h1>
    </div>
  );
};

export default Navbar;
