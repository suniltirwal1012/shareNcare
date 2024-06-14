import React from "react";
import Count from "../DonatePage/counts";
import { NavLink } from "react-router-dom";
import Carousel from "./carousel";

function Search() {
    return (
        <div className="flex flex-col bg-white flex-wrap ">
            <div className="w-full h-[50] justify-center flex">
                <Carousel/>
            </div>
            {/* <div className="absolute z-10 top-[50%] left-[30%]">
            <Count/>
            </div> */}
            <div className="flex flex-wrap md:mt-16 mt-4 ml-4">
                
            </div>
            <div className="flex flex-wrap gap-3 mt-4 mb-8 ml-4">
                <div className="badge badge-ghost hover:cursor-pointer">
                    <NavLink
                        to="../priorityArea">Priority Areas
                    </NavLink>
                </div>

                <div className="badge badge-ghost hover:cursor-pointer">
                    <NavLink
                        to="volunteers">Volunteering Work
                    </NavLink></div>
                <div className="badge badge-ghost hover:cursor-pointer">
                    <NavLink
                        to="donate">Donate
                    </NavLink></div>
            </div>
        </div>
    )
}

export default Search;