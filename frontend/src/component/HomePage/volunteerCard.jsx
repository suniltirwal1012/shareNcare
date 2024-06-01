import React from "react";
import { NavLink } from "react-router-dom";

function VolunteerCard({ img, title, desc, button }) {



    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{desc}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline ">{button}</div>
                    <NavLink
                            to="volunteers">
                    <div className="badge badge-outline hover:cursor-pointer">
                        Support</div></NavLink>
                </div>
            </div>
        </div>
    )
}

export default VolunteerCard;