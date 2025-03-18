/* eslint-disable react/prop-types */
import { MdCancel } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { LibraryContext } from "../contexts/contextFile";
import { useContext, useEffect } from "react";

const ViewModal = ({ selectedBook }) => {
  const { setViewModal } = useContext(LibraryContext);
  return (
    <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 z-20 backdrop-blur-sm">
      <div className=" bg-white shadow-[0_0_10px_#D7D7D7] rounded-lg relative max-w-[900px] w-10/12 min-h-[450px] h-fit p-6  ">
        <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#D7D7D7] p-3 rounded-lg">
              <ImBooks className="text-3xl" />
            </div>
            <span className="text-xl font-semibold">View Book</span>
          </div>
          <button className="text-3xl " onClick={() => setViewModal(false)}>
            <MdCancel />
          </button>
        </div>
        <div className="flex border p-4 gap-4">
          <div className="w-7/12 flex flex-col p-4 border-r-2 border-black">
            <h1 className="text-lg border-b-2 border-black p-2 font-semibold capitalize">{selectedBook.title}</h1>
            <h1 className="text-lg border-b-2 border-black p-2 font-semibold capitalize">{selectedBook.author}</h1>
            <h1 className="text-lg border-b-2 border-black p-2 font-semibold capitalize">{new Date(selectedBook.publishDate).toLocaleDateString()}</h1>
            <h1 className="text-lg border-b-2 border-black p-2 font-semibold capitalize">{selectedBook.description}</h1>
          </div>
          <img src={selectedBook.coverImage} className="w-5/12 h-64" alt=" cover image" />
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
