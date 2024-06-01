import React from "react";

function StaticLocation() {
    return (
        <div >
            <div className="flex justify-center text-5xl font-serif mb-10 text-blue-600"><h1>Location of priority Areas</h1></div>
            <div className="flex flex-wrap  items-center justify-around mb-8 gap-9">
                <div> <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9316.950777912218!2d81.01239341970275!3d26.802214571301448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be37eb0826741%3A0x34d9dd79cdeac7d8!2sIndian%20Institute%20of%20Information%20Technology%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1707295757305!5m2!1sen!2sin" width="600" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                <div> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.297520559011!2d81.00822247582269!3d26.798653676715258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ba6ca2a7a514d%3A0x3d1202273fbf1912!2sSaroj%20Institute%20of%20Technology%20and%20Management!5e0!3m2!1sen!2sin!4v1707559875024!5m2!1sen!2sin" width="600" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
            </div>


        </div>
    )
}

export default StaticLocation;