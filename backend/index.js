// // const express = require('express')// method-1
// import express from "express"; // method-2
// import dotenv from "dotenv"; 
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoute.js";
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// const app = express();
// // import { app,server } from "./socket/socket.js";
// dotenv.config({});

 
// const PORT = process.env.PORT || 5000;

// // middleware
// app.use(express.urlencoded({extended:true}));
// app.use(express.json()); 
// app.use(cookieParser());
// const corsOption={
//     origin:'http://127.0.0.1:5173',
//     credentials:true
// };
// app.use(cors(corsOption)); 


// // routes
// app.use("/api/v1/user",userRoute); 
// app.use("/api/v1/message",messageRoute);
 

// app.listen(PORT, ()=>{
//     connectDB();
//     console.log(`Server is listening at port ${PORT}`);
// });




// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'http://127.0.0.1:5173',
    credentials:true
};
app.use(cors(corsOption)); 


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});

