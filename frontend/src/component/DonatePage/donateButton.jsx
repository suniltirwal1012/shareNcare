import  { useState, useContext,useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { NavLink } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DonateButton() {
    const [selectedFoodType, setSelectedFoodType] = useState('');
    const [selectedFoodTime, setSelectedFoodTime] = useState('');
    const [selectedSourceType, setSelectedSourceType] = useState('');
    const [date, onChange] = useState(new Date());
    const [time, setTime] = useState('');
    const { add, user,setAdd } = useContext(UserContext);


    

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleAcceptClick = () => {
        setIsDialogOpen(true);
    };

    const handleAddressChange = (event) => {
        setAdd(event.target.value); // Update the address state
    };
    
    const handleConfirm =() => {
        setIsDialogOpen(false);
        const formData = {
            foodType: selectedFoodType,
            foodTime: selectedFoodTime,
            quantity: quantity,
            sourceType:selectedSourceType,
            date,
            time,
            address: add ,
        };    
        maneesh(formData);
    
       
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    const handleChange = (event) => {
        setTime(event.target.value);
    };



    const [quantity, setQuantity] = useState(1); // State for the number of servings

    // Function to handle changes in the quantity input
    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleDonate = () => {
        handleAcceptClick();
       
    };


    const maneesh = async (formData) => {
        try {
            const res = await axios.post('https://mern-fullstack-72ou.onrender.com/api/v1/donations/donate', formData, { withCredentials: true });
            setAdd('');
            navigate('/successPage');
            

        } catch (err) {
            setAdd('');
            navigate('/errorPage');
            
        }finally{
            localStorage.removeItem('donateFormData');
        }
    };


    return (
        <div className="bg-white bg-gradient-to-b from-[#FFFFFF] to-[#7585ea]">
            <div>
                <div className="mr-12 ml-12 flex flex-col ">
                    <div>
                        <p className="text-xl font-mono p-12 mb-12">
                            Donate your excess food and help to reduce food wastage and feed people's hunger that will create a positive impact on society.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xl p-4">Food type</label>
                        <div className="flex flex-wrap justify-around">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        name="foodType"
                                        value="Vegetarian"
                                        checked={selectedFoodType === "Vegetarian"}
                                        onChange={() => setSelectedFoodType("Vegetarian")}
                                        className="radio"
                                    />
                                    <span className="label-text ml-4">Vegetarian</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        name="foodType"
                                        value="Non-Vegetarian"
                                        checked={selectedFoodType === "Non-Vegetarian"}
                                        onChange={() => setSelectedFoodType("Non-Vegetarian")}
                                        className="radio"
                                    />
                                    <span className="label-text ml-4">Non-Vegetarian</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        name="foodType"
                                        value="Vegan"
                                        checked={selectedFoodType === "Vegan"}
                                        onChange={() => setSelectedFoodType("Vegan")}
                                        className="radio"
                                    />
                                    <span className="label-text ml-4">Vegan</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col p-4">
                    <div>
                        <h2 className="text-xl font-mono p-4 md:p-12">Source Type</h2>
                    </div>
                    <div className="flex flex-wrap justify-around">
                        <div
                            className="bg-slate-200 rounded-xl w-[20%] gap-4 flex flex-col hover:cursor-pointer items-center p-8"
                            onClick={() => setSelectedSourceType("Event")}
                        >
                            <div>
                                <img src="/event.png" alt="Event" />
                            </div>
                            <div>
                                <p>Event</p>
                            </div>
                        </div>
                        <div
                            className="bg-slate-200 rounded-xl w-[40%] flex gap-4 flex-col hover:cursor-pointer items-center p-8"
                            onClick={() => setSelectedSourceType("Home Kitchen")}
                        >
                            <div>
                                <img src="/home.png" alt="Home Kitchen" />
                            </div>
                            <div>
                                <p>Home Kitchen</p>
                            </div>
                        </div>
                        <div
                            className="bg-slate-200 rounded-xl w-[20%] flex gap-4 flex-col hover:cursor-pointer items-center p-8"
                            onClick={() => setSelectedSourceType("Mess")}
                        >
                            <div>
                                <img src="/mess.png" alt="Mess" />
                            </div>
                            <div>
                                <p>Mess</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center md:mt-12 mt-8 p-4">
                        <div>
                            <div className="flex flex-col">
                                <div>
                                    <h2 className="text-xl font-mono p-4 md:p-12">Number of Servings</h2>
                                </div>
                                <div className="text-3xl md:pl-12 pl-4">
                                    {/* Input field for quantity with onChange event handler */}
                                    <input
                                        className="w-[99%] rounded-lg bg-slate-300"
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        max="500"
                                        value={quantity} // Bind value to state
                                        onChange={handleQuantityChange} // Handle changes in quantity
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col p-4 md:p-12">
                                <label className="text-xl">Time of Cooking</label>
                                <div className="flex flex-wrap justify-around gap-6 md:gap-9">
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <input
                                                type="radio"
                                                name="foodTime"
                                                value="Breakfast"
                                                checked={selectedFoodTime === "Breakfast"}
                                                onChange={() => setSelectedFoodTime("Breakfast")}
                                                className="radio"
                                            />
                                            <span className="label-text ml-1">Breakfast</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <input
                                                type="radio"
                                                name="foodTime"
                                                value="Lunch"
                                                checked={selectedFoodTime === "Lunch"}
                                                onChange={() => setSelectedFoodTime("Lunch")}
                                                className="radio"
                                            />
                                            <span className="label-text ml-1">Lunch</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <input
                                                type="radio"
                                                name="foodTime"
                                                value="Dinner"
                                                checked={selectedFoodTime === "Dinner"}
                                                onChange={() => setSelectedFoodTime("Dinner")}
                                                className="radio"
                                            />
                                            <span className="label-text ml-1">Dinner</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 md:p-12">
                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text text-xl font-mono">Address: </span>
                                    <input type="text" name="address" value={add} onChange={handleAddressChange} placeholder="Address" className="input input-bordered w-full max-w-xs" />
                                    <div className="pt-4">
                                        <NavLink to="../location">
                                            <button className="btn btn-block btn-primary">Choose Location on Map</button>
                                        </NavLink>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="lg:ml-96 md:ml-12">
                            <h1>Select a Date:</h1>
                            <Calendar onChange={onChange} value={date} />
                        </div>
                    </div>
                    <div className="flex justify-center items-center pt-4">
                        <label className="text-2xl font-mono" htmlFor="timeInput">Select a time:</label>
                        <input
                            className="text-2xl ml-8 font-mono border-4 border-black border-6"
                            type="time"
                            id="timeInput"
                            name="timeInput"
                            value={time}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center m-8">
                        {/* Conditionally render the button */}
                        {user ? (
                            <button
                                className="btn btn-active btn-primary w-[20%]"
                                onClick={() => handleDonate(selectedSourceType)}
                            >
                                Donate
                            </button>
                        ) : (
                            <button
                                className="btn btn-disabled btn-primary w-[20%]"
                                disabled
                            >
                                Donate
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-2xl mb-4">Confirmation</h2>
                        <p className="mb-4">Are you sure you want to donate?</p>
                        <div className="flex justify-end gap-4">
                            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DonateButton;
