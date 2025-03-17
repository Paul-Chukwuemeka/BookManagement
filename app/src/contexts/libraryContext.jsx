import PropTypes from "prop-types";
import {  useState } from "react";
import { LibraryContext } from "./contextFile";



const LibraryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("table");
  const [selectedBook, setSelectedBook] = useState({});
  const [viewModal,setViewModal] = useState(false);
  const [editModal,setEditModal] = useState(false);
  const [deleteModal,setDeleteModal] = useState(false);
  return (
    <LibraryContext.Provider
      value={{
        loading,
        setLoading,
        display,
        setDisplay,
        selectedBook,
        setSelectedBook,
        viewModal,
        setViewModal,
        editModal,
        setEditModal,
        deleteModal,
        setDeleteModal,
        
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
LibraryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LibraryProvider;
