import Navbar from "./component/Utils/navbar";
import Footer from "./component/Utils/footer";
import { Outlet } from "react-router-dom";
import UserContextProvider from "./context/userContextProvider";
import useScrollToTopOnButtonClickAndNavLink from "./component/Utils/scrolltoTopHook";



function Layout() {
    useScrollToTopOnButtonClickAndNavLink();

    return (
        <UserContextProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </UserContextProvider>
    )
}

export default Layout