import React, { useState } from "react";

function Donate() {
    // State variables to manage the checked status of checkboxes
    const [foodType1Checked, setFoodType1Checked] = useState(true);
    const [foodType2Checked, setFoodType2Checked] = useState(true);
    const [foodType3Checked, setFoodType3Checked] = useState(true);

    return (
        <>
            <div className="mr-12 ml-12 flex flex-col">
                <div>
                    <p className="text-xl font-mono p-12 mb-12">Donate your excess food and help to reduce food wastage
                        and feed people's hunger that will create a postitive impact on society. </p>
                </div>

                <div className="flex flex-col">
                    <label className="text-xl p-4">Food type</label>
                    <div className="flex flex-wrap justify-around"> 
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={foodType1Checked} 
                                    onChange={() => setFoodType1Checked(!foodType1Checked)} 
                                    className="checkbox" 
                                />
                                <span className="label-text ml-4">Food Type 1</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={foodType2Checked} 
                                    onChange={() => setFoodType2Checked(!foodType2Checked)} 
                                    className="checkbox" 
                                />
                                <span className="label-text ml-4">Food Type 2</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={foodType3Checked} 
                                    onChange={() => setFoodType3Checked(!foodType3Checked)} 
                                    className="checkbox" 
                                />
                                <span className="label-text ml-4">Food Type 3</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Donate;
