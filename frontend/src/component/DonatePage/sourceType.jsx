import React from "react";

function SourceType() {
    return (
        <div className="flex flex-col p-4">
            <div>
                <h2 className="text-xl font-mono p-4 md:p-12">Source Type</h2>
            </div>
            <div className="flex flex-wrap justify-around">
                <div className="bg-slate-200 rounded-xl w-[20%] gap-4 flex flex-col hover:cursor-pointer items-center p-8">
                    <div>
                        <img src="/event.png" alt="" />
                    </div>
                    <div>
                        <p>
                            Event
                        </p>
                    </div>
                </div>
                <div className="bg-slate-200 rounded-xl w-[40%] flex gap-4 flex-col hover:cursor-pointer items-center p-8">
                    <div>
                        <img src="/home.png" alt="" />
                    </div>
                    <div>
                        <p>
                            Home Kitchen
                        </p>
                    </div>
                </div>
                <div className="bg-slate-200 rounded-xl w-[20%] flex gap-4 flex-col hover:cursor-pointer items-center p-8">
                    <div>
                        <img src="/mess.png" alt="" />
                    </div>
                    <div>
                        <p>
                            Mess
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SourceType; 