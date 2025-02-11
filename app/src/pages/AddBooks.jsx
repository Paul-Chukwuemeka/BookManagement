import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import {LibraryContext} from "../contexts/libraryContext"
import Loading from "../Components/loading";




const AddBooks = () => {
  const {loading,setLoading} = useContext(LibraryContext)
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [date, setdate] = useState("");
  const [description, setDescription] =
    useState("");
  const [link, setLink] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const token = user ? user.jwt : null;


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleSubmit = async () => {
    setLoading(true)
    axios
      .post("https://bookmanagement-3qi0.onrender.com/books/post", {
        title: title,
        author: author,
        publishDate: date,
        description: description,
        coverImage: link,
      },
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        console.log("Book Added");
        setLoading(false)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <button
        className="self-start text-2xl mb-10 bg-sky-500 text-white p-4 py-1  rounded-lg"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </button>
        {loading && <Loading />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-2 border w-96 p-4 bg-sky-100"
      >
        <input
          type="text"
          required
          placeholder="Title"
          className="p-2"
          onInput={(e) =>
            setTitle(e.target.value)
          }
        />
        <input
          type="text"
          required
          placeholder="Author"
          className="p-2"
          onInput={(e) =>
            setAuthor(e.target.value)
          }
        />
        <input
          type="text"
          required
          placeholder="link to image"
          className="p-2"
          onInput={(e) => setLink(e.target.value)}
        />
        <input
          type="date"
          required
          placeholder="Publish Date"
          className="p-2"
          onInput={(e) => setdate(e.target.value)}
        />
        <textarea
          name=""
          required
          placeholder="Description"
          id=""
          className="p-2"
          onInput={(e) =>
            setDescription(e.target.value)
          }
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  );
};

export default AddBooks;
