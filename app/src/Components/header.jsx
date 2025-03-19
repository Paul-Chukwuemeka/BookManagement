import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
const Header = () => {
  const [time, setTime] = useState(new Date());
  const [userName, setUserName] = useState("User Name Here");

  useEffect(() => {
    setInterval(()=>{
        setTime(new Date())
    },1000)
  });
  
  useEffect(()=>{
    localStorage.getItem("user") && setUserName(JSON.parse(localStorage.getItem("user")).user.username);
  },[])

  const formattedTime = time.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit", hour12: true }
  );
  const formattedDate = time.toLocaleDateString(
    [],
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="bg-white py-2 px-6 flex justify-between absolute top-0 left-0 w-full">
      <div className="flex gap-2 items-center font-medium">
        <FaUserAlt className="text-3xl" />
        <span>
          <h2 className="text-md capitalize">{userName}</h2>
          <p className="text-xs">Admin</p>
        </span>
      </div>
      <div className="flex gap-2 items-center font-medium">
        <span className="flex flex-col items-end">
          <h2>{formattedTime}</h2>
          <p>{formattedDate}</p>
        </span>
        <hr className="h-full w-[1px]  block bg-gray-500" />
        <MdSettings className="text-3xl" />
      </div>
    </div>
  );
};

export default Header;
