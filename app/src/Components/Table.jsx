import {
  FaEye,
  FaPen,
  FaTrashAlt,
} from "react-icons/fa";


import PropTypes from 'prop-types';

const Table = ({ books, setSelectedBook, setModalState, setDeleteModal, setEditModalState }) => {
  return (
    <table className="w-full table-auto border-collapse border-2 border-sky-500  ">
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Author</th>
        <th>Publish Date</th>
        <th>Menu</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
              {new Date(
                book.publishDate
              ).toLocaleDateString()}
            </td>
            <td className="flex justify-center  items-center gap-2  border-0 border-b-2  text-lg py-2">
              <FaEye
                className="text-green-500 cursor-pointer"
                onClick={() => {
                  setModalState(true);
                  setSelectedBook(book);
                }}
              />
              <FaPen
                className="text-yellow-500 cursor-pointer"
                onClick={() => {
                  setEditModalState(true);
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
  )}
  
Table.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedBook: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  setDeleteModal: PropTypes.func.isRequired,
  setEditModalState: PropTypes.func.isRequired,
};


export default Table