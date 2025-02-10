import PropTypes from 'prop-types';
import { createContext } from "react";

export const LibraryContext = createContext();

const LibraryProvider = ({ children }) => {
  return (
    <div>{children}</div>
  )
}
LibraryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};



export default LibraryProvider