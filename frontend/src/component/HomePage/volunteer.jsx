import React from "react";
import VolunteerCard from "./volunteerCard";

function Volunteers(){
    return(
        <div className="flex flex-col mt-12">
            <div className="border-y-2 border-slate-200 p-6 pl-0">
                <p className="text-3xl font-semibold ml-4">Volunteers and Rescuers</p>
            </div>
            <div className="flex flex-wrap justify-around mt-12 gap-9">
                <VolunteerCard
                title="Volunteering Opportunities"
                desc="Volunteering for the food collection and distribution."
                img="/donation3.jpg"
                button="No cost"
                />
                <VolunteerCard
                title="Food Rescue"
                desc="Rescuing surplus food, fighting hunger, community empowerment."
                img="/donation1.jpg"
                button="Make a difference"
                />
                <VolunteerCard
                title="Food for All"
                desc="Feeding everyone, eliminating hunger, equitable food access."
                img="https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                button="Make an impact"
                />
             
               

            </div>
        </div>
    )
}

export default Volunteers;