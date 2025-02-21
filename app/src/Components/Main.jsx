import Header from "./header";
import Table from "./Table";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import PropTypes from 'prop-types';
const Main = ({books}) => {
  return (
    <div className="relative bg-[#c7c7c770]">
      <Header />
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-bold">Book Management</h1>
        <span className="flex gap-2">
          <button className="flex items-center justify-center p-2 rounded-md gap-2 bg-black text-gray-200">
            <FaPlusCircle className="text-white" />
            Add Book
          </button>
          <span className="flex items-center gap-2 bg-white p-2 rounded-md">
            <FaSearch/>
            <input
              type="text"
              name="search"
              className="bg-transparent border-none outline-none focus:outline-none"
              placeholder="Search by name or author"
              id=""
            />
          </span>
        </span>
      </div>
      <Table books={books}/>
    </div>
  );
};
Main.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Main;

