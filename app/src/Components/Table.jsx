import { FaEye, FaTrashAlt } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { LibraryContext } from "../contexts/contextFile";
import { useContext,useEffect } from "react";
import Loading from "./loading";

import PropTypes from "prop-types";

const Table = ({ books }) => {
  const {
    loading,
    setSelectedBook,
    setViewModal,
    setDeleteModal,
    setEditModal,
  } = useContext(LibraryContext);

  
  return (
    <div className="bg-white shadow-md rounded-lg p-2 overflow-y-auto ">
        {loading && <Loading />}
      <table className="w-full  ">
        <thead>
          <tr className=" border-b border-black">
            <th className="p-2">#</th>
            <th>Title</th>
            <th>Author</th>
            <th className="w-2/12">Publish Date</th>
            <th className="w-2/12">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr key={index} className="text-center font-semibold">
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{new Date(book.publishDate).toLocaleDateString()}</td>
                <td className="flex justify-center p-4 text-xl  items-center gap-4">
                  <BiSolidEditAlt
                    className="cursor-pointer text-2xl"
                    onClick={() => {
                      setEditModal(true);
                      setSelectedBook(book);
                    }}
                  />
                  <FaTrashAlt
                    className="cursor-pointer"
                    onClick={() => {
                      setDeleteModal(true);
                      setSelectedBook(book);
                    }}
                  />
                    <FaEye
                      className="cursor-pointer"
                      onClick={() => {
                        setViewModal(true);
                        
                        setSelectedBook(book);
                      }}
                    />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Table;
