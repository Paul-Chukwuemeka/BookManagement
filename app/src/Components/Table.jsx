import {
  FaEye,
  FaPen,
  FaTrashAlt,
} from "react-icons/fa";
import { LibraryContext } from "../contexts/contextFile";
import { useContext } from "react";
import Loading from "./loading";

import PropTypes from "prop-types";

const Table = ({
  books,

}) => {
  const { loading,setSelectedBook,setViewModal,setDeleteModal,setEditModal } = useContext(LibraryContext);
  return (
    <div className="bg-white shadow-md rounded-lg p-2 ">
      <table className="w-full  ">
        {loading && <Loading />}
        <thead>
          <tr className=" border-b border-black">
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publish Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr
                key={index}
                className="text-center"
              >
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  {new Date(
                    book.publishDate
                  ).toLocaleDateString()}
                </td>
                <td className="flex justify-center  items-center gap-2 ">
                  <FaEye
                    className="text-green-500 cursor-pointer"
                    onClick={() => {
                      setViewModal(true);
                      setSelectedBook(book);
                    }}
                  />
                  <FaPen
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => {
                      setEditModal(true);
                      setSelectedBook(book);
                    }}
                  />
                  <FaTrashAlt
                    className="text-red-500 cursor-pointer"
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
