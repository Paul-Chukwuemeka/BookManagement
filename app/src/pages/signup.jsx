import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (
    username,
    email,
    password
  ) => {
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
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );
      navigate("/");
    } catch (error) {
      setError(true);
      if (error.response) {
        setErrorMessage(
          error.response.data.message
        );
      } else {
        setErrorMessage(
          "An unexpected error occurred."
        );
      }
    }
  };
  const transition =
    "hover:bg-white duration-700  hover:text-black hover:border hover:border-black";

  return (
    <div className="grid grid-cols-2">
      <div className="bg-black text-sky-500 rounded-[0px_30px_30px_0px] h-screen text-5xl flex flex-col justify-between gap-2 items-center p-24  ">
        <div className="flex flex-col items-center gap-1">
          <img
            src="/darkLogo.png"
            alt="Logo"
            className="w-24"
          />
          <p>
            Book
            <span className="text-red-500 text-6xl">
              Worm
            </span>
          </p>
          <p className="text-3xl text-white">
            Library
          </p>
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
      <div className="flex flex-col justify-between items-center px-32 p-20 gap-4">
        <div className="flex flex-col justify-between h-2/5 items-center gap-1 ">
          <img
            src="/lightlogo.png"
            alt="Logo"
            className="w-20"
          />
          <h2 className="text-5xl  gap-1 flex items-center font-bold">
            Sign In
          </h2>
          <p className="text-lg">
            Please provide your information to sign up
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSignup(
              userName,
              email,
              password
            );
          }}
          className="flex w-full flex-col gap-4 justify-center items-center"
        >
          <h1 className="text-2xl font-bold">
            Create an account
          </h1>
          <input
            type="text"
            className="p-4 w-full border border-black rounded-2xl"
            placeholder="User name"
            required
            onInput={(e) =>
              setUserName(e.target.value)
            }
          />
          <input
            type="text"
            className="p-4 w-full border border-black rounded-2xl"
            placeholder="Email"
            required
            onInput={(e) =>
              setEmail(e.target.value)
            }
          />
          <input
            type="password"
            className="p-4 w-full border border-black rounded-2xl"
            placeholder="Password"
            required
            onInput={(e) =>
              setPassword(e.target.value)
            }
          />
          {error && (
            <p className="text-red-500">
              {errorMessage}
            </p>
          )}
          <button
            className={`bg-black p-3 rounded-2xl text-xl font-bold w-full text-white focus:outline-none ${transition}`}
          >
            <span>Sign Up</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
