import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DonationCard from "./donationCard";

function DonationsByUser() {
  const [data, setData] = useState(null);

  async function fetchVolunteerData() {
    try {
      const response = await fetch(
        "/api/v1/users/donationsDoneByUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log(res);
      console.log("manee", res.data)
      setData(res.data.donations);
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    }
  }

  // Call the async function

  useEffect(() => {
    fetchVolunteerData();
  }, []);

  return (
    <div className="flex flex-col flex-wrap justify-center items-center md:gap-12 gap-9 mt-12">
      <div className="flex justify-center items-center p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-center">
          Donations Made By You
        </h1>
      </div>
      <div>
        <div className="flex flex-col gap-6 mb-12">
          {data &&
            data.map((obj, index) => (
              <DonationCard key={index} index={index+1} data={obj} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default DonationsByUser;
