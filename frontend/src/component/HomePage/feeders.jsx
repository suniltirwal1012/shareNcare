import React from "react";
import FeederCard from "./feederCard";

function Feeders(){
    return(
        <div className="flex flex-col">
            <div className="border-y-2 border-slate-200 p-6 pl-0">
                <p className="text-3xl font-semibold ml-4">Donors and Feeders</p>
            </div>
            <div className="flex flex-wrap justify-around mt-12 gap-9">
                <FeederCard 
                title="Hostel Mess"
                desc="A lot of food is getting wasted in messes of school and college."
                imgLink="https://img.freepik.com/free-photo/front-view-box-with-provisions-food-day_23-2148613311.jpg?w=2000&t=st=1707557067~exp=1707557667~hmac=c9623375d7cb6d39e83fc5e6ec75ab2585228cb92e220246afeece60555e2071"
                />
                <FeederCard 
                title="Party Leftovers"
                desc="Party,marriages and family functions."
                imgLink="https://images.unsplash.com/photo-1615897570582-285ffe259530?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <FeederCard 
                title="Household Leftovers"
                desc="A lot of food is getting wasted daily in  home kitchens."
                imgLink="/donation7.jpg"
                />
               

            </div>
        </div>
    )
}

export default Feeders;