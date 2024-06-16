
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import axios from "axios";

export default function DonationCard({ index, data }) {
  const { user } = useContext(UserContext);
  const [donarData, setDonarData] = useState(null);
  const userID = data.donar;

  async function fetchDonarData() {
    try {
      const response = await axios.post(
        "/api/v1/users/findUserById",
        { userId: userID }
      );
      setDonarData(response.data.data);
    } catch (error) {
      console.error("Error fetching donar data:", error);
    }
  }

  useEffect(() => {
    fetchDonarData();
  }, [userID]);

  return (
    <div className="card w-[90vw] bg-primary text-primary-content p-4 rounded-lg mx-auto mb-4">
      <div className="card-body">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-2">
              <h2 className="card-title text-xl md:text-3xl">{index}.</h2>
              <h2 className="card-title text-xl md:text-3xl">
                {donarData ? donarData.name : "Loading..."}
              </h2>
            </div>
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
      </div>
    </div>
  );
}
