import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LibraryContext } from "../contexts/contextFile";
import Loading from "./loading";

const AddBooks = () => {
  const { loading, setLoading } = useContext(LibraryContext);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [date, setdate] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.jwt : null;

  const handleSubmit = async () => {
    setLoading(true);
    axios
      .post(
        "https://bookmanagement-3qi0.onrender.com/books/post",
        {
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
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const navigate = useNavigate();
  const transition =
    "hover:bg-white duration-700  hover:text-black hover:border hover:border-black";

  return (
    <div className="flex flex-col justify-center items-center p-4 absolute duration-700 top-0 right-0 left-0 bottom-0">
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
          onInput={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Author"
          className="p-2"
          onInput={(e) => setAuthor(e.target.value)}
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
          onInput={(e) => setDescription(e.target.value)}
        ></textarea>
        <span className="flex gap-2 justify-center">
          <button
            className={`p-2 w-36 rounded-lg border border-black ${transition} bg-black text-white`}
          >
            Cancel
          </button>
          <button
            className={`p-2 w-36 rounded-lg  border border-black ${transition}  hover:bg-black hover:text-white`}
          >
            Save
          </button>
        </span>
      </form>
    </div>
  );
};

export default AddBooks;
