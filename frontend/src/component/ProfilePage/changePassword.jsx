import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
  const [newPassword, setnewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    
    try {
      const response = await axios.post(
        "/api/v1/users/changePassword",
        { newPassword: newPassword }
      );
      setMessage("New Password has been set.");
    } catch (err) {
      setError("Error setting new password. Please try again.");
      console.error("Error submitting the form:", err);

    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-auto p-6">
      <div className="w-full flex flex-col gap-9">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl footer-title text-slate-800">
            Change Password
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-8"
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-xl font-mono">newPassword: </span>
              <span className="label-text-alt">required</span>
            </div>
            <input
              type="newPassword"
              placeholder="eg: johnsmith@mail.com"
              className="input input-bordered w-full max-w-xs"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
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
              {isLoading ? "Sending..." : "Set Password"}
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

export default ChangePassword;
