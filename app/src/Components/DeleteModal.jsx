import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LibraryContext } from "../contexts/contextFile";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const DeleteModal = () => {
  const { setDeleteModal, selectedBook } = useContext(LibraryContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.jwt : null;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleDelete = (id) => {
    axios.delete(`https://bookmanagement-3qi0.onrender.com/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  console.log(selectedBook);
  return (
    <div className="absolute w-full flex justify-center items-center top-0 left-0 z-2 h-full backdrop-blur-sm">
      <div className=" bg-white shadow-[0_0_10px_#D7D7D7] rounded-lg relative max-w-[700px] w-10/12 min-h-[250px] h-fit p-6  ">
        <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#D7D7D7] p-3 rounded-lg">
              <FaTrashAlt className="text-3xl" />
            </div>
            <span className="text-2xl">Add Book</span>
          </div>
          <button className="text-3xl " onClick={() => setDeleteModal(false)}>
            <MdCancel />
          </button>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-xl text-center">
            {`Are you certain you wish to proceed with the deletion of "${selectedBook.title}"`}
          </h1>
          <button
            className=" bg-black border-black border-1 font-bold duration-700 text-xl py-3 w-64 text-white cursor-pointer rounded-lg hover:bg-white hover:text-black "
            onClick={() => {
              handleDelete(selectedBook._id);
              setDeleteModal(false);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
