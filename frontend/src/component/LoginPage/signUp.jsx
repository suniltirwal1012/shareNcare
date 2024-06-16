import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import axios from "axios";

function SignUp() {
  const { add, setMail } = useContext(UserContext);

  const initialFormData = {
    name: "",
    dob: "",
    email: "",
    phoneno: "",
    nationality: "",
    gender: "",
    address: add || "",
    password: "",
  };

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  const [error, setError] = useState(""); // State for error message
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [avatar, setAvatar] = useState(null); // State for avatar file

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      address: add,
    }));
  }, [add]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setError(""); 
    localStorage.removeItem("formData"); 
    setIsLoading(true); 
    login();
  };

  const navigate = useNavigate();

  const login = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (avatar) {
      formDataToSend.append("avatar", avatar);
    }

    await axios
      .post("https://mern-fullstack-72ou.onrender.com/api/v1/users/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setMail(formData.email);
        
          setIsLoading(false); // Set loading to false after success
          navigate("/otp");
        
       
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setIsLoading(false); 
        setError(err.response?.data?.errors || "An error occurred");

        // Set loading to false after error
      });
  };

  return (
    <div className="flex justify-center items-center h-auto ">
      
        <div className="w-full flex flex-col gap-9 p-6">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl footer-title text-slate-800">Sign Up</h1>
          </div>
          {error && (
            <div
              className="mt-4 flex items-center bg-red-50 border-l-4 border-red-400 p-4 shadow-md rounded-lg"
              role="alert"
            >
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm md:text-lg font-medium text-red-700">
                  {error}
                </p>
              </div>
              <button
                type="button"
                className="ml-auto bg-red-50 rounded-md p-1.5 inline-flex items-center text-red-500 hover:bg-red-100 hover:text-red-600"
                onClick={() => setError("")}
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-8">
              <label className="form-control w-full max-w-xs">
                <span className="label-text text-xl font-mono">Name: </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text text-xl font-mono">DOB: </span>
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label">
                  <span className="label-text-alt italic">
                    should be DD/MM/YYYY format only
                  </span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text text-xl font-mono">Email Id: </span>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-xl font-mono">Phone: </span>
                  <span className="label-text-alt">required</span>
                </div>
                <div className="flex flex-row">
                  <input
                    type="text"
                    name="phoneno"
                    placeholder="1234567890"
                    className="input input-bordered w-full max-w-xs"
                    value={formData.phoneno}
                    onChange={handleChange}
                  />
                </div>
                <div className="label">
                  <span className="label-text-alt italic">
                    Should contain 10 digits excluding country code.
                  </span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text text-xl font-mono">
                  Nationality:{" "}
                </span>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="select border-slate-300 w-full max-w-xs text-xl"
                >
                  <option value="">Choose Country</option>
                  <option>Afghanistan</option>
                  <option>Albania</option>
                  <option>Algeria</option>
                  <option>Andorra</option>
                  <option>Angola</option>
                  <option>Antigua and Barbuda</option>
                  <option>Argentina</option>
                  <option>Armenia</option>
                  <option>Australia</option>
                  <option>Austria</option>
                  <option>Azerbaijan</option>
                  <option>Bahamas</option>
                  <option>Bahrain</option>
                  <option>Bangladesh</option>
                  <option>Barbados</option>
                  <option>Belarus</option>
                  <option>Belgium</option>
                  <option>Belize</option>
                  <option>Benin</option>
                  <option>Bhutan</option>
                  <option>Bolivia</option>
                  <option>Bosnia and Herzegovina</option>
                  <option>Botswana</option>
                  <option>Brazil</option>
                  <option>Brunei</option>
                  <option>Bulgaria</option>
                  <option>Burkina Faso</option>
                  <option>Burundi</option>
                  <option>Cambodia</option>
                  <option>Cameroon</option>
                  <option>Canada</option>
                  <option>Cape Verde</option>
                  <option>Central African Republic</option>
                  <option>Chad</option>
                  <option>Chile</option>
                  <option>China</option>
                  <option>Colombia</option>
                  <option>Comoros</option>
                  <option>Congo (Brazzaville)</option>
                  <option>Congo (Kinshasa)</option>
                  <option>Costa Rica</option>
                  <option>Croatia</option>
                  <option>Cuba</option>
                  <option>Cyprus</option>
                  <option>Czech Republic</option>
                  <option>Denmark</option>
                  <option>Djibouti</option>
                  <option>Dominica</option>
                  <option>Dominican Republic</option>
                  <option>East Timor (Timor Timur)</option>
                  <option>Ecuador</option>
                  <option>Egypt</option>
                  <option>El Salvador</option>
                  <option>Equatorial Guinea</option>
                  <option>Eritrea</option>
                  <option>Estonia</option>
                  <option>Eswatini</option>
                  <option>Ethiopia</option>
                  <option>Fiji</option>
                  <option>Finland</option>
                  <option>France</option>
                  <option>Gabon</option>
                  <option>Gambia, The</option>
                  <option>Georgia</option>
                  <option>Germany</option>
                  <option>Ghana</option>
                  <option>Greece</option>
                  <option>Grenada</option>
                  <option>Guatemala</option>
                  <option>Guinea</option>
                  <option>Guinea-Bissau</option>
                  <option>Guyana</option>
                  <option>Haiti</option>
                  <option>Honduras</option>
                  <option>Hungary</option>
                  <option>Iceland</option>
                  <option>India</option>
                  <option>Indonesia</option>
                  <option>Iran</option>
                  <option>Iraq</option>
                  <option>Ireland</option>
                  <option>Israel</option>
                  <option>Italy</option>
                  <option>Jamaica</option>
                  <option>Japan</option>
                  <option>Jordan</option>
                  <option>Kazakhstan</option>
                  <option>Kenya</option>
                  <option>Kiribati</option>
                  <option>Korea, North</option>
                  <option>Korea, South</option>
                  <option>Kosovo</option>
                  <option>Kuwait</option>
                  <option>Kyrgyzstan</option>
                  <option>Laos</option>
                  <option>Latvia</option>
                  <option>Lebanon</option>
                  <option>Lesotho</option>
                  <option>Liberia</option>
                  <option>Libya</option>
                  <option>Liechtenstein</option>
                  <option>Lithuania</option>
                  <option>Luxembourg</option>
                  <option>Madagascar</option>
                  <option>Malawi</option>
                  <option>Malaysia</option>
                  <option>Maldives</option>
                  <option>Mali</option>
                  <option>Malta</option>
                  <option>Marshall Islands</option>
                  <option>Mauritania</option>
                  <option>Mauritius</option>
                  <option>Mexico</option>
                  <option>Micronesia</option>
                  <option>Moldova</option>
                  <option>Monaco</option>
                  <option>Mongolia</option>
                  <option>Montenegro</option>
                  <option>Morocco</option>
                  <option>Mozambique</option>
                  <option>Myanmar</option>
                  <option>Namibia</option>
                  <option>Nauru</option>
                  <option>Nepal</option>
                  <option>Netherlands</option>
                  <option>New Zealand</option>
                  <option>Nicaragua</option>
                  <option>Niger</option>
                  <option>Nigeria</option>
                  <option>North Macedonia</option>
                  <option>Norway</option>
                  <option>Oman</option>
                  <option>Pakistan</option>
                  <option>Palau</option>
                  <option>Palestinian Territories</option>
                  <option>Panama</option>
                  <option>Papua New Guinea</option>
                  <option>Paraguay</option>
                  <option>Peru</option>
                  <option>Philippines</option>
                  <option>Poland</option>
                  <option>Portugal</option>
                  <option>Qatar</option>
                  <option>Romania</option>
                  <option>Russia</option>
                  <option>Rwanda</option>
                  <option>Saint Kitts and Nevis</option>
                  <option>Saint Lucia</option>
                  <option>Saint Vincent and the Grenadines</option>
                  <option>Samoa</option>
                  <option>San Marino</option>
                  <option>Sao Tome and Principe</option>
                  <option>Saudi Arabia</option>
                  <option>Senegal</option>
                  <option>Serbia</option>
                  <option>Seychelles</option>
                  <option>Sierra Leone</option>
                  <option>Singapore</option>
                  <option>Slovakia</option>
                  <option>Slovenia</option>
                  <option>Solomon Islands</option>
                  <option>Somalia</option>
                  <option>South Africa</option>
                  <option>South Sudan</option>
                  <option>Spain</option>
                  <option>Sri Lanka</option>
                  <option>Sudan</option>
                  <option>Suriname</option>
                  <option>Sweden</option>
                  <option>Switzerland</option>
                  <option>Syria</option>
                  <option>Taiwan</option>
                  <option>Tajikistan</option>
                  <option>Tanzania</option>
                  <option>Thailand</option>
                  <option>Togo</option>
                  <option>Tonga</option>
                  <option>Trinidad and Tobago</option>
                  <option>Tunisia</option>
                  <option>Turkey</option>
                  <option>Turkmenistan</option>
                  <option>Tuvalu</option>
                  <option>Uganda</option>
                  <option>Ukraine</option>
                  <option>United Arab Emirates</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Uruguay</option>
                  <option>Uzbekistan</option>
                  <option>Vanuatu</option>
                  <option>Vatican City</option>
                  <option>Venezuela</option>
                  <option>Vietnam</option>
                  <option>Yemen</option>
                  <option>Zambia</option>
                  <option>Zimbabwe</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text text-xl font-mono">Address: </span>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="pt-4">
                  <NavLink to="../location">
                    <button className="btn btn-block btn-primary">
                      Choose Location on Map
                    </button>
                  </NavLink>
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text text-xl font-mono">Gender: </span>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select border-slate-300 w-full max-w-xs text-xl"
                >
                  <option value="">Choose Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </label>
             
              <label className="form-control w-full max-w-xs">
                <span className="label-text text-xl font-mono">Password: </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label">
                  <span className="label-text-alt italic">
                    Password must be at least 8 characters.
                  </span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text text-xl font-mono">
                  Upload Avatar:
                </span>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />{" "}
              </label>
              
              <div className="form-control w-full max-w-xs">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
              </div>
            </div>
          </form>
          <p className="text-center font-mono text-lg text-slate-800">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="link link-hover link-primary font-semibold"
            >
              Sign In
            </NavLink>
          </p>
        </div>
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
      <h2 className="text-2xl font-bold mb-2">Sending Otp...</h2>
      <p className="text-gray-600 mb-4">
        Please wait while we process your request.
      </p>
     
      
    </div>
  </div>
)}

    </div>
  );
}

export default SignUp;
