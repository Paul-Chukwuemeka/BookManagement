/* eslint-disable react/prop-types */
import { MdCancel } from "react-icons/md";

const ViewModal = ({ setModalState,selectedBook }) => {
  return (
    <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 z-2 backdrop-blur-sm">
      <div className="border-4 relative border-sky-500 p-8">
        <button
          className="text-red-500  text-3xl absolute top-0 right-0"
          onClick={() => setModalState(false)}
        >
          <MdCancel />
        </button>
        <div>
            <img src={selectedBook.coverImage} alt=" cover image" />
            <h1>{selectedBook.title}</h1>
            <h1>{selectedBook.author}</h1>
            <h1>{new Date(selectedBook.publishDate).toLocaleDateString()}</h1>
            <h1>{selectedBook.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
