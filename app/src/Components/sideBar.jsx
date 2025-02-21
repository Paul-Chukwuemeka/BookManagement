import { MdDashboard } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FaCompass,FaUsers } from "react-icons/fa6";
import { HiOutlineOfficeBuilding } from "react-icons/hi";


const SideBar = () => {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("user");
        navigate("/login");
      };
    
    const classList = "flex items-center px-5 gap-2 p-2 w-full text-white hover:bg-white hover:text-black cursor-pointer";
  return (
    <div className="h-fit min-h-screen pt-4 font-light bg-black text-white flex flex-col items-center ">
      <img
        src="/darkLogo.png"
        alt="Logo"
        className="h-12 mb-2"
      />
      <h1 className="text-2xl">BookWorm</h1>
      <p className="text-md ">Library</p>

      <div className="mt-2 w-full flex flex-col items-center">
        <span className={classList}>
          {" "}
          <MdDashboard />
          <p>Dashboard</p>
        </span>
        <span className={classList}>
          <FaCompass />
          <p>Catalog</p>
        </span>
        <span className={classList}>
          <IoBook />
          <p>Books</p>
        </span>
        <span className={classList}><FaUsers/>
          <p>Users</p>
        </span>
        <span className={classList}><HiOutlineOfficeBuilding/>
          <p>Branches</p>
        </span>
      </div>

        <button className="text-white p-2 w-full mt-44 flex items-center gap-2 font-bold hover:bg-white hover:text-black cursor-pointer"
        onClick={()=>{
            logOut()
        }}
        >
         <CiLogout/> Logout
        </button>
    </div>
  );
};

export default SideBar;
