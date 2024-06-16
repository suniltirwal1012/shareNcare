
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import UserContext from "../../context/userContext";
import axios from "axios";

export default function Card({ index, data }) {
  const { user } = useContext(UserContext);
  const [donarData, setDonarData] = useState(null);
  const userID = data.donar;

  async function fetchDonarData() {
    try {
      const reponse = await axios.post(
        "https://mern-fullstack-72ou.onrender.com/api/v1/users/findUserById",
        { userId: userID }
      );
      setDonarData(reponse.data.data);
    } catch (error) {
      console.error("Error fetching donar data:", error);
    }
  }

  useEffect(() => {
    fetchDonarData();
  }, [userID]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAcceptClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    setIsLoading(true);
    handleAccept();
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleAccept = async () => {
    try {
      const res = await axios.post(
        "https://mern-fullstack-72ou.onrender.com/api/v1/volunteering/accept",
        { donationId: data._id }
      );
      setIsLoading(false);
      navigate("/successPage");
    } catch (error) {
      console.error("Error accepting donation:", error);
      navigate("/errorPage");
    }
  };

  return (
    <>
      <div className="card w-[90vw] bg-primary text-primary-content p-4 rounded-lg mx-auto mb-4">
        <div className="card-body">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <h2 className="card-title text-xl md:text-3xl">{index}.</h2>
              <h2 className="card-title text-xl md:text-3xl">
                {donarData ? donarData.name : "Loading..."}
              </h2>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 text-xl md:text-3xl mt-2 md:mt-0">
              <h2>{data.sourceType}</h2>
              <h2>|</h2>
              <h2>{data.foodType}</h2>
              <h2>|</h2>
              <h2>{data.foodTime}</h2>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-4 gap-2 md:gap-4">
            <p className="text-lg md:text-2xl">{data.address}</p>
            <p className="text-lg md:text-2xl">
              Number of servings: {data.quantity}
            </p>
          </div>
          <p className="text-base md:text-xl">
            {donarData ? donarData.email : "Loading..."}
          </p>
          <p className="text-base md:text-xl">
            {donarData ? donarData.phoneno : "Loading..."}
          </p>
          <p className="text-base md:text-xl">Date: {data.date}</p>
          <p className="text-base md:text-xl">Time: {data.time}</p>
          <div className="card-actions justify-end mt-4 gap-2">
            {user ? (
              <>
                <button className="btn" onClick={handleAcceptClick}>
                  Accept
                </button>
                <a
                  href={`mailto:${
                    donarData ? donarData.email : "Loading..."
                  }?subject=${encodeURIComponent(
                    "Enquiry regarding your donation"
                  )}&body=${encodeURIComponent(
                    `Dear ${donarData ? donarData.name : "Sir"}` +
                      "\n\n" +
                      `My name is ${user.name} and I would love to volunteer your donation but before that i have some queries.` +
                      "\n\n" +
                      "Ask your queries here..." +
                      "\n\n" +
                      `Please reply to this email or contact me at ${user.email} or ${user.phoneno}. Thank you!` +
                      "\n\n" +
                      "Regards," +
                      "\n" +
                      `${user.name}`
                  )}`}
                >
                  <button className="btn btn-secondary">Chat</button>
                </a>
              </>
            ) : (
              <>
                <button disabled className="btn">
                  Accept
                </button>
                <button disabled className="btn btn-secondary">
                  Chat
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
            <h2 className="text-2xl mb-4">Confirmation</h2>
            <p className="mb-4">
              Are you sure you want to accept this donation?
            </p>
            <div className="flex justify-end gap-4">
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin h-10 w-10 text-primary mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V2.5M20 21.5a8 8 0 01-8-8V4"
        ></path>
      </svg>
      <h2 className="text-2xl font-bold mb-2">Accepting...</h2>
      <p className="text-gray-600 mb-4">
        Please wait while we process your request.
      </p>
      
      {/* <button
        className="btn btn-secondary"
        onClick={() => setIsUploading(false)}
      >
        Cancel
      </button> */}
    </div>
  </div>
)}

    </>
  );
}
