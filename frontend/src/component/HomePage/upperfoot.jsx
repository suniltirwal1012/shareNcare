import React from "react";
import { NavLink } from "react-router-dom";

function Foot() {
    return (
        <div className="flex flex-wrap rounded-2xl gap-6 m-12 bg-slate-200 mb-12 p-4 justify-around items-center">
            <div className="flex items-center gap-6">
            <div >
                <img className="h-12 w-auto" src="https://www.svgrepo.com/show/128592/palm-of-the-hand.svg" alt="" />
            </div>
            <div className="flex flex-col flex-wrap">
                <div >
                    <p className="font-semibold font-2xl">Support the cause</p>
                </div>
                <div>
                    <p className="font-xl">Join our community to make posituve impact on people life and make a scoial differenece.<br />Together we can make a better world free of hunger.</p>
                </div>
            </div>
            </div>
            <div className="">
                <NavLink to="/login">
                <button className="btn btn-outline btn-success">Sign Up</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Foot;