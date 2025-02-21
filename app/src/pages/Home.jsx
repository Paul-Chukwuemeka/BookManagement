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
import { LibraryContext } from "../contexts/libraryContext";
import SideBar from "../Components/sideBar";
import Main from "../Components/Main";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [modalState, setModalState] =
    useState(false);
  const [deleteModal, setDeleteModal] =
    useState(false);
  const [editModalState, setEditModalState] =
    useState(false);

  const { setLoading, selectedBook } = useContext(
    LibraryContext
  );

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
        } else {
          console.log(error);
        }
      }
    };

    fetchBooks();
  }, [token, deleteModal, editModalState]);


  return (
    <div className="min-h-screen relative grid-cols-[160px_1fr] grid">
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
      <SideBar/>
      <Main books={books}/>
     
    </div>
  );
};

export default Home;
