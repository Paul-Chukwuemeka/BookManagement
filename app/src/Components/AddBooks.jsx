import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LibraryContext } from "../contexts/contextFile";
import Loading from "./loading";
import { MdCancel } from "react-icons/md";
import { ImBooks } from "react-icons/im";

const AddBooks = () => {
  const { loading, setLoading, setAddBook } = useContext(LibraryContext);
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
    <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 z-20 backdrop-blur-sm">
      <div className=" bg-white shadow-[0_0_10px_#D7D7D7] rounded-lg relative w-10/12 min-h-[450px] h-fit p-6 ">
        <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#D7D7D7] p-3 rounded-lg">
              <ImBooks className="text-3xl" />
            </div>
            <span className="text-2xl">Add Book</span>
          </div>
          <button className="text-3xl " onClick={() => setAddBook(false)}>
            <MdCancel />
          </button>
        </div>
        {loading && <Loading />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className=" flex-col flex gap-2"
        >
          <div className="flex  gap-2">
            <input
              type="text"
              required
              placeholder="Title"
              className="p-3 border-2 w-10/12 border-gray-300 rounded-lg"
              onInput={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              required
              placeholder="Publish Date"
              className="p-2 border-2"
              onInput={(e) => setdate(e.target.value)}
            />
          </div>
          <input
            type="text"
            required
            placeholder="Author"
            className="p-2 border-2"
            onInput={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="link to image"
            className="p-2 border-2"
            onInput={(e) => setLink(e.target.value)}
          />
          <textarea
            name=""
            required
            placeholder="Description"
            maxLength={400}
            id=""
            className="p-2 border-2 h-fit resize-none"
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
    </div>
  );
};

export default AddBooks;
