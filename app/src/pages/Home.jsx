import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/sideBar";
import Main from "../Components/Main";
import { LibraryContext } from "../contexts/contextFile";

const Home = () => {
  const { setLoading, deleteModal, editModal, addBook, search } =
    useContext(LibraryContext);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
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
  }, [token, deleteModal, editModal, addBook]);
  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);
  useEffect(() => {
    if (search.length > 1) {
      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredBooks(books);
    }
  }, [search]);

  return (
    <div className="min-h-screen relative grid-cols-[160px_1fr] grid">
      <SideBar />
      <Main books={filteredBooks} />
    </div>
  );
};

export default Home;
