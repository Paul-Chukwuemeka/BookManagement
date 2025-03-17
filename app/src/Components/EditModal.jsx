/* eslint-disable react/prop-types */

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { LibraryContext } from "../contexts/contextFile";

import axios from "axios";

const EditModal = () => {
  const { selectedBook, setEditModal } = useContext(LibraryContext);
  const [author, setAuthor] = useState(selectedBook.author);
  const [title, setTitle] = useState(selectedBook.title);
  const [date, setdate] = useState(selectedBook.publishDate);
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
    axios.put(
      `https://bookmanagement-3qi0.onrender.com/books/${id}`,
      newSelectedBook,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  useEffect(() => {
    setNewselectedBook({
      title: title,
      author: author,
      publishDate: date,
      description: description,
      coverImage: link,
    });
  }, [title, author, date, description, link]);
  return (
    <div className="w-full h-full z-10 flex pt-20 justify-center items-start backdrop-blur-sm absolute top-0 left-0">
      <div className=" p-8 relative">
        <button
          className="text-red-500  text-3xl top-0 right-0"
          onClick={() => setEditModal(false)}
        >
          <MdCancel />
        </button>
        <h1>Edit selectedBook Details</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
            setEditModal(false);
          }}
          className="flex flex-col gap-2 border w-96 p-4 bg-sky-100"
        >
          <input
            type="text"
            required
            placeholder="Title"
            className="p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Author"
            className="p-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="link to image"
            className="p-2"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="date"
            required
            placeholder="Publish Date"
            className="p-2"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
          <textarea
            name=""
            required
            placeholder="Description"
            id=""
            className="p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
