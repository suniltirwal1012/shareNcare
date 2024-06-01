import React from "react";
import UserContext from "./userContext";



const UserContextProvider =  ({children}) => {
    const [user,setUser] = React.useState(null)
    const [add,setAdd]=React.useState(null)
    const [mail,setMail]=React.useState(null)

    return(
        <UserContext.Provider value={{user,setUser,add,setAdd,mail,setMail}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider

