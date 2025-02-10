import axios from "axios";
import { useState, useEffect } from "react";
import ViewModal from "../Components/ViewModal";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../Components/DeleteModal";
import EditModal from "../Components/EditModal";
import Loading from "../Components/loading";

import {
  FaEye,
  FaPen,
  FaTrashAlt,
  FaPlus,
} from "react-icons/fa";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [modalState, setModalState] =
    useState(false);
  const [deleteModal, setDeleteModal] =
    useState(false);
  const [editModalState, setEditModalState] =
    useState(false);
  const [selectedBook, setSelectedBook] =
    useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = user ? user.jwt : null;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    try {
      setLoading(true)
      const fetchBooks = async () => {
        const response = await axios.get(
          "https://bookmanagement-3qi0.onrender.com/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data);
        setLoading(false)
      };
      fetchBooks();
    } catch (error) {
      setLoading(false)
      console.log(error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  }, [deleteModal, editModalState]);

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="p-5 min-h-[89.7vh] relative">
      {modalState && (
        <ViewModal
          selectedBook={selectedBook}
          setModalState={setModalState}
        />
      )}
      {deleteModal && (
        <DeleteModal
          selectedBook={selectedBook}
          setDeleteModal={setDeleteModal}
        />
      )}
      {editModalState && (
        <EditModal
          selectedBook={selectedBook}
          setEditModalState={setEditModalState}
        />
      )}
      {loading && <Loading />}

      <div className="flex justify-between items-center relative">
        <button
          className="p-2 border-2 w-fit  text-sky-500 border-sky-300 cursor-pointer my-3"
          onClick={() => navigate("./AddBooks")}
        >
          {" "}
          <FaPlus />
        </button>
        <span className="p-2  rounded-full flex gap-2 ">
          <span
            className="flex items-center gap-2 rounded-lg text-white border-2 p-0.5  shadow-md bg-red-600 cursor-pointer"
            onClick={() => {
              logOut();
            }}
          >
            <p className="font-semibold text-lg">
              Log out
            </p>
          </span>
        </span>
      </div>
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
                <td className="flex justify-center  items-center gap-2 border-none p-2">
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
    </div>
  );
};

export default Home;
