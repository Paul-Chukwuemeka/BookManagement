import {
  useState,
  useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { LibraryContext } from "../contexts/contextFile";
import axios from "axios";
import Loading from "../Components/loading";

const Login = () => {
  const { loading, setLoading } = useContext(
    LibraryContext
  );
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogIn = async (email, password) => {
    setError(false);
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://bookmanagement-3qi0.onrender.com/user/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(true);
      if (error.response) {
        setErrorMessage(
          error.response.data.message
        );
        setLoading(false);
      } else {
        setErrorMessage(
          "An unexpected error occurred."
        );
        setLoading(false);
      }
    }
  };
  const transition = "hover:bg-white duration-700  hover:text-black hover:border hover:border-black"
  return (
    <div className="grid grid-cols-2 gap-0 h-screen ">
      <div className="flex flex-col justify-between items-center px-32 p-24 gap-4">
        {loading && <Loading />}
        <div className="flex flex-col justify-between h-2/5 items-center gap-1 ">
          <img
            src="/lightlogo.png"
            alt="Logo"
            className="w-20"
          />
          <h2 className="text-4xl  gap-1 flex items-center font-bold">
            Welcome Back!!
          </h2>
          <p className="text-lg">
            Please enter your credentials to login
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleLogIn(email, password);
          }}
          className="flex w-full flex-col gap-4 justify-center items-center"
        >
          <input
            type="text"
            required
            className="p-4 w-full border border-black rounded-2xl"
            placeholder="Email"
            onInput={(e) =>
              setEmail(e.target.value)
            }
          />
          <input
            type="password"
            required
            className="p-4 w-full border border-black rounded-2xl"
            placeholder="Password"
            onInput={(e) =>
              setPassword(e.target.value)
            }
          />
          <p className="self-start font-semibold">
            Forgot Password?
          </p>
          {error && (
            <p className="text-red-500">
              {errorMessage}
            </p>
          )}
          <button className={`bg-black p-3 rounded-2xl text-xl font-bold w-full text-white focus:outline-none ${transition}`}>
            <span>Log in</span>
          </button>
        </form>
      </div>
      <div className="bg-black text-sky-500 rounded-[30px_0_0_30px] h-screen  flex flex-col justify-between gap-4 items-center p-24">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/darkLogo.png"
            alt="Logo"
            className="w-24"
          />
          <p className="text-6xl font-semibold">
            BookWorm
          </p>
          <p className="text-3xl text-white">
            Library
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <p className="text-white text-xl">
            New to our platform? sign up now.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className={`text-white text-xl border px-16 py-3 rounded-2xl ${transition}`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
