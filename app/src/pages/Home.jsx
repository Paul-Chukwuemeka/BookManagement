import axios from "axios";
import { useState, useEffect, useContext,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/sideBar";
import Main from "../Components/Main";
import { LibraryContext } from "../contexts/contextFile";

const Home = () => {
  const { setLoading, search,update,setUpdate } =
    useContext(LibraryContext);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.jwt : null;

  const fetchBooks = useCallback(async () => {
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
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching books:", error); 
      }
    } finally {
      setLoading(false);
    }
  }, [token, navigate, setLoading]);

  useEffect(() => {
    fetchBooks();
    setUpdate(false)
  }, [fetchBooks,update]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    if (search.trim().length > 1) {
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
    <div className="min-h-screen relative grid-cols-[160px_1fr] grid max-xl:block">
      <SideBar />
      <Main books={filteredBooks} />
    </div>
  );
};

export default Home;
