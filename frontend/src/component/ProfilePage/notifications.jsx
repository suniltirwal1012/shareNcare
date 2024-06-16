/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../context/userContext";




function Notifications() {
    const {user}=useContext(UserContext)
    const [count,setCount]=useState(0)

    async function getUnreadMessagesCount() {
        const response=await axios.get("/api/v1/notifications/getCount")
        setCount(response.data.data.TotalCount)
    }

    useEffect(() => {
        getUnreadMessagesCount()
    }
    , [])






    return (
        <div className="h-[65vh]">
            {user && (
                <div role="alert" className="alert shadow-lg p-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have {count} unread message!</div>
                </div>
                <NavLink
                    to="../unread">
                    <button className="btn btn-sm">See</button>
                </NavLink>
            </div>
            )}
        </div>
    )
}

export default Notifications

