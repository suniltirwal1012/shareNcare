import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import UserContext from "../../context/userContext";

export default function Card({ data }) {
    const { user } = useContext(UserContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleAcceptClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        // Redirect to home page after a short delay
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <div className="card w-[90vw] bg-primary text-primary-content p-4 rounded-lg mx-auto mb-4">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                            <h2 className="card-title text-xl md:text-3xl">{data.donationId}.</h2>
                            <h2 className="card-title text-xl md:text-3xl">{data.name}</h2>
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
                        <p className="text-lg md:text-2xl">Number of servings: {data.quantity}</p>
                    </div>
                    <p className="text-base md:text-xl">{data.email}</p>
                    <p className="text-base md:text-xl">{data.phoneno}</p>
                    <p className="text-base md:text-xl">Date: {data.date}</p>
                    <p className="text-base md:text-xl">Time: {data.time}</p>
                    <div className="card-actions justify-end mt-4 gap-2">
                        {user ? (
                            <>
                                <button className="btn" onClick={handleAcceptClick}>
                                    Accept
                                </button>
                                <button className="btn btn-secondary">Chat</button>
                            </>
                        ) : (
                            <>
                                <button disabled className="btn">
                                    Accept
                                </button>
                                <button disabled className="btn btn-secondary">Chat</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
                        <h2 className="text-2xl mb-4">Confirmation</h2>
                        <p className="mb-4">Are you sure you want to accept this donation?</p>
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
        </>
    );
}
