import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigateToProfile = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill all the fields");
      setMessage("");
      return;
    }
    loginUser();
  };

  const { setUser } = useContext(UserContext);

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData
      );
      setUser(res.data.data.user);
      setErrorMessage("");
      setMessage("");
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigateToProfile("/profile");
      }, 2000);
    } catch (error) {
      setMessage("");
      setErrorMessage(error.response?.data?.errors || "An error occurred");
      setShowSuccessMessage(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  return (
    <div className="flex justify-center items-center h-[70vh] mb-28">
      <div className="h-4/5 w-full flex flex-col gap-9">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl footer-title text-slate-800">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-8">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xl font-mono">
                  Username/Email Id:{" "}
                </span>
                <span className="label-text-alt">required</span>
              </div>
              <input
                type="text"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xl font-mono">Password: </span>
                <span className="label-text-alt">required</span>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex justify-center mt-8">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          {message && (
            <p className="text-red-600 text-2xl font-mono flex flex-col justify-center items-center mt-8">
              {message}
            </p>
          )}

          {errorMessage && (
            <div
              className="mt-4 flex items-center bg-red-50 border-l-4 border-red-400 p-4 shadow-md rounded-lg"
              role="alert"
            >
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div className="ml-3">
                <p className="text-sm md:text-lg font-medium text-red-700">
                  {errorMessage}
                </p>
              </div>
              <button
                type="button"
                className="ml-auto bg-red-50 rounded-md p-1.5 inline-flex items-center text-red-500 hover:bg-red-100 hover:text-red-600"
                onClick={() => setErrorMessage("")}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {showSuccessMessage && (
            <div className="flex flex-row justify-center items-center">
            <p className="text-green-600 text-2xl font-mono flex flex-col justify-center items-center mt-8">
              Successfully logged in. Redirecting..
            </p>
            <img src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-1024.png" className="flex items-baseline w-12 h-12"></img>
            </div>
          )}
        </form>
        <div className="flex justify-center flex-wrap items-center gap-10">
          <div className="">
            <NavLink to="/ForgotPassword">
              <p className="link link-hover text-blue-600">Forgot Password?</p>
            </NavLink>
          </div>
          <div className="">
            <NavLink to="/register">
              <p className="link link-hover text-blue-600">New User?</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
