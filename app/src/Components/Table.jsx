import { FaEye, FaTrashAlt } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { LibraryContext } from "../contexts/contextFile";
import { useContext } from "react";
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
    <div className="bg-white shadow-md rounded-lg p-2 ">
      <table className="w-full  ">
        {loading && <Loading />}
        <thead>
          <tr className=" border-b border-black">
            <th className="p-2">#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publish Date</th>
            <th>Action</th>
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
                <td className="flex justify-center p-2 text-xl  items-center gap-4">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => {
                      setViewModal(true);
                      setSelectedBook(book);
                    }}
                  />
                  <LuPencilLine
                    className="cursor-pointer"
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
