import PropTypes from "prop-types";
import {  useState } from "react";
import { LibraryContext } from "./contextFile";


const LibraryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("table");
  const [selectedBook, setSelectedBook] = useState({});
  return (
    <LibraryContext.Provider
      value={{
        loading,
        setLoading,
        display,
        setDisplay,
        selectedBook,
        setSelectedBook,
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
