import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) 
app.use(express.urlencoded({extended: true,limit: "16kb"}))  //it means we can pass nested objects if we dont mention anything it will still run fine..no need to do so.
app.use(express.static("public"))

app.use(cookieParser())


//importing routes

import userRouter from "./routes/user.route.js"
import contactRouter from "./routes/contact.route.js"
import donateRouter from "./routes/donation.route.js"
import volunteerRouter from "./routes/volunteer.route.js"
import notifiactionRouter from "./routes/notifications.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/contact",contactRouter)
app.use("/api/v1/donations",donateRouter)
app.use("/api/v1/volunteering",volunteerRouter)
app.use("/api/v1/notifications",notifiactionRouter)


export { app }