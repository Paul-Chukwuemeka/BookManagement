import axios from "axios";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LibraryContext } from "../contexts/contextFile";
import { useContext } from "react";


const DeleteModal = () => {
    const {
      setDeleteModal,
      selectedBook
    } = useContext(LibraryContext);
  const navigate = useNavigate();
    const user = JSON.parse(
      localStorage.getItem("user")
    );
    const token = user ? user.jwt : null;
  
  
    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, [token]);
    
  const handleDelete = (id) => {
    axios.delete(
      `https://bookmanagement-3qi0.onrender.com/books/${id}`,
      {
        headers:{
          Authorization : `Bearer ${token}`
        }
      }
    );
  };
  console.log(selectedBook)
  return (
    <div className="absolute w-full flex justify-center items-center top-0 left-0 z-2 h-full backdrop-blur-sm">
      <div className="border-4 relative border-red-500 p-8 flex flex-col gap-4 z-50">
        <h1 className="text-xl">
          {`Are you sure you want to delete " ${selectedBook.title}"`}
        </h1>
        <div className="flex items-center justify-center gap-4">
          <button
            className="bg-red-600 px-6 py-2 text-white cursor-pointer rounded-lg"
            onClick={() => {
              handleDelete(selectedBook._id);
              setDeleteModal(false);
            }}
          >
            Yes
          </button>
          <button
            className="bg-sky-500 px-6 py-2 text-white cursor-pointer rounded-lg"
            onClick={() => {setDeleteModal(false)
            console.log(selectedBook)
            }

            }
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};


export default DeleteModal;
