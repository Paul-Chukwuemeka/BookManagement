import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LibraryContext } from "../contexts/contextFile";
import Loading from "../Components/loading";

const Signup = () => {
  const { loading, setLoading } = useContext(LibraryContext);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (username, email, password) => {
    console.log(userName, email, password);
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        "https://bookmanagement-3qi0.onrender.com/user/signup",
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setError(true);
      setLoading(false);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  const transition =
    "hover:bg-white duration-700  hover:text-black hover:border hover:border-black";

  return (
    <div className="grid grid-cols-2 max-xl:block">
      <div className="bg-black text-white rounded-[0px_30px_30px_0px] h-screen text-5xl flex flex-col justify-around gap-2 items-center p-24 max-xl:hidden  ">
        {loading && <Loading />}
        <div className="flex flex-col items-center gap-1">
          <img src="/darkLogo.png" alt="Logo" className="w-24" />
          <p>BookWorm</p>
          <p className="text-3xl text-white">Library</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-xl">
            Already have an account? Sign In now.
          </p>
          <button
            onClick={() => navigate("/login")}
            className={`text-white text-xl border px-16 py-3 rounded-2xl ${transition}`}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-around items-center px-32 p-16 gap-6 max-xl:px-12 ">
        <div className="flex flex-col justify-center h-2/5 items-center gap-6 ">
          <img src="/lightlogo.png" alt="Logo" className="w-28" />
          <h2 className="text-4xl  gap-1 flex items-center font-bold">
            Sign In
          </h2>
          <p className="text-lg">Please provide your information to sign up</p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSignup(userName, email, password);
          }}
          className="flex w-full py-5 max-w-[450px] flex-col gap-4 justify-center items-center"
        >
          <input
            type="text"
            className="p-4  w-full border border-black rounded-lg"
            placeholder="User name"
            required
            onInput={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            className="p-4  w-full border border-black rounded-lg"
            placeholder="Email"
            required
            onInput={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <input
            type="password"
            className="p-4  w-full border border-black rounded-lg"
            placeholder="Password"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{errorMessage}</p>}
          <button
            className={`bg-black p-3 rounded-2xl text-xl py-4  font-bold w-4/5 text-white focus:outline-none ${transition}`}
          >
            <span>Sign Up</span>
          </button>
        </form>
        <h2 className="text-center hidden max-xl:block text-md font-semibold">Already have an account? <span className="underline"> Sign In now.</span></h2>
      </div>
    </div>
  );
};

export default Signup;
