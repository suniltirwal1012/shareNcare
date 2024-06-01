import React from "react";
import ServiceCard from "./servicesCard";

function Services() {
    return (
        <div className="flex flex-col mt-12 mb-24">
            <div className="border-y-2 border-slate-200 p-6 pl-0">
                <p className="text-3xl font-semibold ml-4">Services on Otamoz</p>
            </div>
            <div className="flex flex-wrap justify-around mt-12 gap-9">
                <ServiceCard
                    title="Excess Food collection"
                    desc="Save Food" 
                    imgLink="https://img.freepik.com/premium-photo/welcome-team-shot-two-young-restaurant-owners-standing-outside-together-shaking-hands_590464-53704.jpg"
                    button="Doorstep Collection"
                    route="/doorstepCollection"
                />
                <ServiceCard
                    title="Quality Check and Storage"
                    desc="Store food"
                    imgLink="https://images.unsplash.com/photo-1606859191214-25806e8e2423?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHN0b3JhZ2V8ZW58MHx8MHx8fDA%3D"
                    button="Foodgrade Inspection"
                    route="/foodgradeInspection"
                />
                <ServiceCard
                    title="Feed the hungry"
                    desc="Help those Inneed"
                    imgLink="https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=600"
                    button="Food Distribution "
                    route="/foodDistribution"
                />
               
            </div>
        </div>
    )
}

export default Services;