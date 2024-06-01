import React from "react";
import Search from "./search";
import Feeders from "../HomePage/feeders";
import Volunteers from "../HomePage/volunteer";
import Services from "../HomePage/services";
import Foot from "./upperfoot";


function Landing() {
    return (
        <>
            <Search />
            <Feeders />
            <Volunteers />
            <Services />
            
            
            <Foot />
        </>
    )
}

export default Landing;