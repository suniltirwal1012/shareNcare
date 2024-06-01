import React from "react";
import { NavLink } from "react-router-dom";

function ServiceCard({title,desc,imgLink,button,route}) {
    return (
        <div className="card w-96 glass">
        <figure><img src={imgLink} alt="car!"/></figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{desc}</p>
          <div className="card-actions justify-end">
            <NavLink to={route}>
            <button className="btn btn-primary">{button}</button>
            </NavLink>
          </div>
        </div>
      </div>
    )
}

export default ServiceCard;