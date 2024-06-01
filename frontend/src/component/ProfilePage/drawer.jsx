import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/userContext";


function Drawer() {

    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-12 md:p-24 md:gap-9 gap-6 flex flex-col">
                
                <div className="lg:ml-16 md:ml-8">
                    <div>
                        <p className="text-4xl font-semibold">Personal Information</p>
                    </div>
                </div>
                <div className="avatar lg:ml-16 md:ml-8">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>


                <div className="flex justify-around w-2/3">
                    <div className="flex flex-col gap-6 ml-12">
                        <div><p className="font-semibold">Username </p></div>
                        <div><p className="font-semibold">Date of birth</p></div>
                        <div><p className="font-semibold">Email</p></div>
                        <div><p className="font-semibold">Address</p></div>
                        <div><p className="font-semibold">Mobile_No</p></div>
                        <div><p className="font-semibold">Nationality</p></div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div><p className="">{user.name}</p></div>
                        <div><p className="">{user.dob}</p></div>
                        <div><p className="">{user.email}</p></div>
                        <div><p className="">{user.address}</p></div>
                        <div><p className="">{user.phoneno}</p></div>
                        <div><p className="">{user.nationality}</p></div>
                    </div>
                   

                </div>

                <div className="flex justify-center mt-12">
                    <label htmlFor="my-drawer" className="btn btn-primary btn-sm drawer-button">Profile Settings</label>
                </div>

            </div>




            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <p className="font-semibold text-4xl p-4">Profile Settings</p>
                    <li className="text-xl"> <a> <img className="w-6 h-auto" src="/profile.png" alt="" />Personal Information</a></li>
                    <li className="text-xl"> <NavLink to="../notifications"> <img className="w-6 h-auto" src="/notif.gif" alt="" />Notifications</NavLink></li>
                    <li className="text-xl"> <NavLink to="../share"> <img className="w-6 h-auto" src="/invite.png" alt="" />Invite Members</NavLink></li>
                    <li className="text-xl"> <NavLink to="../payment"> <img className="w-6 h-auto" src="/pay.png" alt="" />Payment details</NavLink></li>


                </ul>

            </div>
        </div>
    )
}

export default Drawer;