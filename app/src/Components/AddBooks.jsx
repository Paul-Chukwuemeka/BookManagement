import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext,useRef,useEffect } from "react";
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

  const textAreaRef = useRef(null);

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
        setLoading(false);
        setAddBook(false);
        textAreaRef.current.value = "";
      })
      .catch((err) => {
        setAddBook(false);
        setLoading(false);
      });
  };
useEffect(()=>{
  const textArea = textAreaRef.current;
  if(textArea){
    textArea.style.height = "150px";
    textArea.style.height = `${textArea.scrollHeight}px`;
  }
},[description])
  const transition =
    " duration-700  hover:text-black hover:border hover:border-black";



  return (
    <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 z-20 backdrop-blur-sm">
      <div className=" bg-white shadow-[0_0_10px_#D7D7D7] rounded-lg relative max-w-[700px] w-10/12 min-h-[450px] h-fit p-6 ">
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
              className="p-3 border-2 w-10/12 border-gray-300 rounded-md"
              onInput={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              required
              placeholder="Publish Date"
              className="p-2 border-2 border-gray-300 rounded-md"
              onInput={(e) => setdate(e.target.value)}
            />
          </div>
          <input
            type="text"
            required
            placeholder="Author"
            className="p-2 border-2 border-gray-300 rounded-md"
            onInput={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="link to image"
            className="p-2 border-2 border-gray-300 rounded-md"
            onInput={(e) => setLink(e.target.value)}
          />
          <textarea
            name=""
            required
            ref={textAreaRef}
            placeholder="Description"
            maxLength={500}
            value={description}
            id=""
            className="p-2 border-2 h-fit resize-none border-gray-300 rounded-md"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <span className="flex gap-2 justify-center">
            <button
            onClick={()=>{
              setAddBook(false);
              textAreaRef.current.value = "";
            }}
              className={`p-2 w-36 rounded-lg border border-black ${transition} bg-black hover:bg-white text-white`}
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
