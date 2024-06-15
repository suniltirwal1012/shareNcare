import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import UserContext from "../../context/userContext";
import axios from "axios";

function Drawer() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging out...");
      const response = await axios.post(
        "/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      console.log(response.data.message);
      // Clear the user context
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  //avatat upload
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState(
    user?.avatar
      ? user.avatar
      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
  );
  const fileInputRef = useRef(null); // Ref for file input element

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Check if the file type is jpeg or jpg
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/png"
    ) {
      console.log(
        "Unsupported file type. Please select a JPEG, JPG, or PNG file."
      );
      return;
    }

    setAvatar(file);

    // Call handleAvatarUpload directly when a file is selected
    await handleAvatarUpload(file);
  };

  const handleAvatarUpload = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      console.log("Uploading avatar...");
      setIsUploading(true);
      const response = await axios.post(
        "/api/v1/users/updateUserAvatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Avatar upload response:", response.data);
      setAvatar(response.data.data.avatar);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  console.log("Avatar:", avatar);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-12 md:p-12 md:gap-9 gap-6 flex flex-col">
        <div className="">
          <div className="flex justify-center">
            <p className="md:text-4xl text-3xl font-semibold">
              Personal Information
            </p>
          </div>
        </div>
        <div className="avatar flex flex-row justify-center p-4">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
            <img
              src={avatar}
              onClick={() => fileInputRef.current.click()}
              className="hover:scale-110 transform transition-transform duration-500 ease-in-out rounded-full w-24 h-24 object-cover hover:cursor-pointer"
            />

            <input
              type="file"
              ref={fileInputRef} // Ref to access the input element
              onChange={handleFileChange} // Handle file selection
              style={{ display: "none" }} // Hide the input element
            />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-2xl mx-auto p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="font-semibold break-words">Username:</div>
            <div className="break-words">{user.name}</div>

            <div className="font-semibold break-words">Date of Birth:</div>
            <div className="break-words">{user.dob}</div>

            <div className="font-semibold break-words">Email:</div>
            <div className="break-words">{user.email}</div>

            <div className="font-semibold break-words">Address:</div>
            <div className="break-words">{user.address}</div>

            <div className="font-semibold break-words">Mobile No:</div>
            <div className="break-words">{user.phoneno}</div>

            <div className="font-semibold break-words">Nationality:</div>
            <div className="break-words">{user.nationality}</div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <label
            htmlFor="my-drawer"
            className="btn btn-primary btn-sm drawer-button"
          >
            Profile Settings
          </label>
        </div>
      </div>

      <div className="drawer-side mt-[10vh] z-10">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <p className="font-semibold text-4xl p-4">Profile Settings</p>
          <li className="text-xl">
            {" "}
            <NavLink to="">
              {" "}
              <img className="w-6 h-auto" src="/profile.png" alt="" />
              Personal Information
            </NavLink>
          </li>
          <li className="text-xl">
            {" "}
            <NavLink to="../notifications">
              {" "}
              <img className="w-6 h-auto" src="/notif.gif" alt="" />
              Notifications
            </NavLink>
          </li>

          <li className="text-xl">
            {" "}
            <NavLink to="../donationsByUser">
              {" "}
              <img
                className="w-6 h-auto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBr7o4nrLXd-Bz2zzcjsVssTPRVLFUK4uWyw&sf"
                alt=""
              />
              Donations
            </NavLink>
          </li>
          <li className="text-xl">
            {" "}
            <NavLink to="../volunteeringsByUser">
              {" "}
              <img
                className="w-6 h-auto"
                src="https://img.freepik.com/premium-vector/young-volunteer-with-food-donation-donation-box-concept-illustrations-donation-box-donation-volunteers-concept-illustration-set-perfect-banner-mobile-app-landing-page_106796-289.jpg"
                alt=""
              />
              Volunteerings
            </NavLink>
          </li>
          <li className="text-xl">
            {" "}
            <NavLink to="../share">
              {" "}
              <img className="w-6 h-auto" src="/invite.png" alt="" />
              Invite Members
            </NavLink>
          </li>
          <li className="text-xl">
            {" "}
            <NavLink to="../payment">
              {" "}
              <img className="w-6 h-auto" src="/pay.png" alt="" />
              Payment details
            </NavLink>
          </li>
          <li className="text-xl">
            {" "}
            <NavLink to="../changePassword">
              {" "}
              <img
                className="w-6 h-auto"
                src="https://png.pngtree.com/png-vector/20190120/ourmid/pngtree-key-vector-icon-png-image_470666.jpg"
                alt=""
              />
              Change Password
            </NavLink>
          </li>
          <li className="text-xl">
            {" "}
            <a
              href=""
              onClick={handleLogout} // Call handleLogout function on click
            >
              {" "}
              <img
                className="w-6 h-auto"
                src="https://icons.veryicon.com/png/o/internet--web/website-icons/logout-8.png"
                alt=""
              />
              Logout User
            </a>
          </li>
        </ul>
      </div>
      {isUploading && (
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
            <h2 className="text-2xl font-bold mb-2">Uploading...</h2>
            <p className="text-gray-600 mb-4">
              Please wait while we process your request.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Drawer;
