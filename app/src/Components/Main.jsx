import Header from "./header";
import Table from "./Table";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import ViewModal from "../Components/ViewModal";
import DeleteModal from "../Components/DeleteModal";
import EditModal from "../Components/EditModal";
import { useContext, useEffect, useState } from "react";
import { LibraryContext } from "../contexts/contextFile";
import AddBooks from "./AddBooks";

const Main = ({ books }) => {
  const {
    selectedBook,
    viewModal,
    deleteModal,
    editModal,
    addBook,
    setAddBook,
    setSearch,
  } = useContext(LibraryContext);
  useEffect(() => {
    console.log(addBook);
  }, [addBook]);

  return (
    <div className="relative bg-[#c7c7c770] h-screen p-4 grid grid-rows-[120px_1fr]">
      {viewModal && (
        <ViewModal selectedBook={selectedBook} viewModal={viewModal} />
      )}
      {deleteModal && <DeleteModal selectedBook={selectedBook} />}
      {editModal && (
        <EditModal selectedBook={selectedBook} editModal={editModal} />
      )}
      {addBook && <AddBooks />}
      <Header />
      <div className="flex justify-between p-4 mt-10 items-center">
        <h1 className="text-2xl font-bold max-md:hidden">Book Management</h1>
        <span className="flex gap-2">
          <button
            className="flex items-center justify-center p-2 py-2 text-lg rounded-md gap-2 bg-black text-gray-200 max-xl:text-lg"
            onClick={() => {
              setAddBook(true);
            }}
          >
            <FaPlusCircle className="text-white " />
            <span className="max-md:hidden">Add Book</span>
          </button>
          <span className="flex items-center gap-2 bg-white p-2 rounded-md max-xl:p-3 ">
            <FaSearch />
            <input
              type="text"
              name="search"
              className="bg-transparent border-none outline-none focus:outline-none"
              placeholder="Search by name or author"
              id=""
              onInput={(e) => {
                setSearch(e.target.value);
              }}
            />
          </span>
        </span>
      </div>
      <Table books={books} />
    </div>
  );
};
Main.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Main;
