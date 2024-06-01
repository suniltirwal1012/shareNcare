import React from "react";
import { NavLink } from "react-router-dom";

function FeederCard({ title, desc, imgLink }) {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={imgLink} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{desc}</p>
                <div className="card-actions justify-end">
                    <NavLink
                        to="donate"><button className="btn btn-primary">Donate Now</button></NavLink>

                </div>
            </div>
        </div>
    )
}

export default FeederCard;