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

  const navigate = useNavigate()

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
      localStorage.setItem("user",JSON.stringify(response.data))
     navigate('/')
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
  return (
    <div className="p-6">

    <form
      className="shadow-[0px_-6px_37px_0px_rgba(0,_0,_0,_0.1)] w-[330px] mt-10 m-auto gap-5 p-4  flex flex-col justify-center rounded-xl items-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSignup(
          userName,
          email,
          password
        );
      }}
    >

      <h1 className="text-2xl font-bold">
        Create an account
      </h1>
      <input
        type="text"
        className="p-3 w-full border-2 rounded-lg"
        placeholder="User name"
        onInput={(e) =>
          setUserName(e.target.value)
        }
      />
      <input
        type="text"
        className="p-3 w-full border-2 rounded-lg"
        placeholder="Email"
        onInput={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="p-3 w-full border-2 rounded-lg"
        placeholder="Password"
        onInput={(e) =>
          setPassword(e.target.value)
        }
      />
      {error && (
        <p className="text-red-500">
          {errorMessage}
        </p>
      )}
      <button className="bg-sky-500 p-2 py-1.5 rounded-lg w-6/12 text-white focus:outline-none hover:bg-sky-600">
        <span>Sign Up</span>
      </button>
    </form>
      </div>
  );
};

export default Signup;
