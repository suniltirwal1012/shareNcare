import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Layout from './layout.jsx'
import Landing from './component/HomePage/landing.jsx'
import Volunteering from './component/VolunteerPage/volunteering.jsx'
import DonateButton from './component/DonatePage/donateButton.jsx'
import GoogleMap from './component/Utils/map.jsx'
import StaticLocation from './component/OtherPages/staticlocation.jsx'
import Contact from './component/ContactUsPage/contact.jsx'
import Login from './component/LoginPage/register.jsx'
import Drawer from './component/ProfilePage/drawer.jsx'
import Notifications from './component/ProfilePage/notifications.jsx'
import Unread from './component/ProfilePage/unread.jsx'
import SignUp from './component/LoginPage/signUp.jsx'
import ForgotPassword from './component/LoginPage/forgotPassword.jsx'
import Otp from './component/LoginPage/otp.jsx'
import ShareOptions from './component/ProfilePage/sharing.jsx'
import PaymentOptions from './component/ProfilePage/paymentOptions.jsx'
import DoorstepCollection from './component/StaticPages/doorstepCollection.jsx'
import FoodgradeInspection from './component/StaticPages/foodgradeInspection.jsx'
import FoodDistribution from './component/StaticPages/foodDistribution.jsx'
import ChangePassword from './component/ProfilePage/changePassword.jsx';

import axios from 'axios';
import ErrorPage from './component/Utils/erroPage.jsx';
import SuccessPage from './component/Utils/successPage.jsx';
import DonationCard from './component/ProfilePage/donations.jsx';
import DonationsByUser from './component/ProfilePage/donations.jsx';
import VolunteeringByUser from './component/ProfilePage/volunteerings.jsx';




const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Landing/>
      },
      {
        path:"donate",
        element:<DonateButton/>,
      },
      {
        path:"volunteers",
        element:<Volunteering/>
      },
      {
        path:"errorPage",
        element:<ErrorPage/>
      },
      {
        path:"successPage",
        element:<SuccessPage/>
      },
      {
        path:"location",
        element:<GoogleMap/>
      },
      {
        path:"priorityArea",
        element:<StaticLocation/>
      },
      {
        path:"forgotpassword",
        element:<ForgotPassword/>
      },
      {
        path:"otp",
        element:<Otp/>
      },
      {
        path:"share",
        element:<ShareOptions/>
      },
      {
        path:"payment",
        element:<PaymentOptions/>
      },
      {
        path:"changePassword",
        element:<ChangePassword/>
      },
      {
        path:"doorstepCollection",
        element:<DoorstepCollection/>
      },
      {
        path:"foodgradeInspection",
        element:<FoodgradeInspection/>
      },
      {
        path:"foodDistribution",
        element:<FoodDistribution/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<SignUp/>
      },
      {
        path:"profile",
        element:<Drawer/>
      },
      {
        path:"notifications",
        element:<Notifications/>
      },
      {
        path:"unread",
        element:<Unread/>
      },
      {
        path:"donationsByUser",
        element:<DonationsByUser/>
      },
      {
        path:"volunteeringsByUser",
        element:<VolunteeringByUser/>
      }
    ]
  }
])

axios.defaults.withCredentials = true;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
