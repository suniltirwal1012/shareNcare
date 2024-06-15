import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    
    try {
        console.log(email);
      const response = await axios.post(
        "/api/v1/users/forgotPassword",
        { email: email }
      );
      console.log(response);
      setMessage("New Password has been sent to your email.Kindly login and change your password.");
    } catch (err) {
      setError("Error sending password reset link. Please try again.");
      //console.error("Error submitting the form:", err);
      console.log("Error submitting the form:", err);

    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-auto p-6">
      <div className="w-full flex flex-col gap-9">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl footer-title text-slate-800">
            Forgot Password
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-8"
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-xl font-mono">Email Id: </span>
              <span className="label-text-alt">required</span>
            </div>
            <input
              type="email"
              placeholder="eg: johnsmith@mail.com"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex justify-center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Get Password"}
            </button>
          </div>
        </form>
        <div className="flex justify-center flex-wrap items-center gap-">
          <div className="">
            <Link to="../login">
              <p className="link link-hover text-blue-600">
                Go Back To Login Page
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
