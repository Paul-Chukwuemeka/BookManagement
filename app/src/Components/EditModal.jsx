/* eslint-disable react/prop-types */

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { LibraryContext } from "../contexts/contextFile";
import { ImBooks } from "react-icons/im";

import axios from "axios";

const EditModal = () => {
  const { selectedBook, setEditModal,setUpdate } = useContext(LibraryContext);
  const [author, setAuthor] = useState(selectedBook.author);
  const [title, setTitle] = useState(selectedBook.title);
  const [date, setDate] = useState(selectedBook.publishDate);
  const [description, setDescription] = useState(selectedBook.description);
  const [link, setLink] = useState(selectedBook.coverImage);
  const [newSelectedBook, setNewselectedBook] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.jwt : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleUpdate = async () => {
    const id = selectedBook._id;
    try {
      axios.put(
        `https://bookmanagement-3qi0.onrender.com/books/${id}`,
        newSelectedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdate(true)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "150px";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [description]);

  const textAreaRef = useRef(null);
  useEffect(() => {
    if (selectedBook.publishDate) {
      const formattedDate = new Date(selectedBook.publishDate)
        .toISOString()
        .split("T")[0];
      setDate(formattedDate);
    }
  }, [selectedBook.publishDate]);

  useEffect(() => {
    console.log(date)
    setNewselectedBook({
      title: title,
      author: author,
      publishDate: date,
      description: description,
      coverImage: link,
    });
  }, [title, author, date, description, link]);

  return (
    <div className="w-full h-full z-10 flex pt-20 justify-center items-center backdrop-blur-sm absolute top-0 left-0  ">
      <div className=" bg-white shadow-[0_0_10px_#D7D7D7] rounded-lg relative max-w-[700px] w-10/12 min-h-[450px] h-fit p-6 ">
        <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#D7D7D7] p-3 rounded-lg">
              <ImBooks className="text-3xl" />
            </div>
            <span className="text-2xl">Add Book</span>
          </div>
          <button className="text-3xl " onClick={() => setEditModal(false)}>
            <MdCancel />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
            setEditModal(false);
          }}
          className=" flex-col justify-center items-center flex gap-2"
        >
          <input
            type="text"
            required
            placeholder="Title"
            className="p-3 border-2 w-10/12 border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Author"
            className="p-3 border-2 w-10/12 border-gray-300 rounded-md"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="link to image"
            className="p-3 border-2 w-10/12 border-gray-300 rounded-md"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="date"
            required
            placeholder="Publish Date"
            className="p-3 border-2 w-10/12 border-gray-300 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <textarea
            name=""
            ref={textAreaRef}
            required
            placeholder="Description"
            maxLength={500}
            className="p-3 border-2 w-10/12 border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            className={`p-3 py-2 w-44 text-xl font-semibold rounded-lg duration-700 border border-black text-white bg-black hover:bg-white hover:text-black`}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
