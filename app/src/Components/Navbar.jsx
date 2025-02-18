import PropTypes from "prop-types";



const Navbar = ({className}) => {
  return (
    <div className={`p-4 relative z-10 ${className} `}>
      <h1 className=" flex items-center font-bold gap-2 text-sky-600">
        <img src="/lightlogo.png"/>
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

Navbar.propTypes = {
  className: PropTypes.string,
};


export default Navbar;
