import axios from "axios";
import {
  useState,
  useEffect,
  useContext,
} from "react";
import ViewModal from "../Components/ViewModal";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../Components/DeleteModal";
import EditModal from "../Components/EditModal";
import Loading from "../Components/loading";
import { LibraryContext } from "../contexts/libraryContext";
import { FaTableList } from "react-icons/fa6";
import { PiSquaresFourFill } from "react-icons/pi";
import Table from "../Components/Table";
import Card from "../Components/Card";

import {
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

  const { loading, setLoading, setDisplay ,display } =
    useContext(LibraryContext);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = user ? user.jwt : null;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://bookmanagement-3qi0.onrender.com/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response?.status === 401) {
          navigate("/login");
        }
        else{
          console.log(error);
        }
      }
    };

    fetchBooks();
  }, [token,deleteModal,editModalState]);

  
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="px-5 min-h-[89.7vh] relative">
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
      <span className="flex  gap-2 text-xl mb-2">
        <button
          className="p-1 text-black hover:bg-sky-300 hover:text-white focus:outline-none rounded-lg flex items-center justify-center gap-1"
          onClick={() => {
            setDisplay("list");
          }}
        >
          <FaTableList /> List
        </button>
        <button
          className="p-1 text-black hover:bg-sky-300 hover:text-white focus:outline-none rounded-lg flex items-center justify-center gap-1"
          onClick={() => {
            setDisplay("table");
          }}
        >
          <PiSquaresFourFill /> Table
        </button>
      </span>
      {display === "table" ? (
        <Table books={books} selectedBook={selectedBook} setSelectedBook={setSelectedBook} setModalState={setModalState} setDeleteModal={setDeleteModal} setEditModalState={setEditModalState}/>
      ) : (
        <Card />
      )}
    </div>
  );
};

export default Home;
