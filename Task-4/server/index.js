import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})

app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:"https://starlit-chimera-338548.netlify.app",credentials:true}))

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

app.use("/api/auth", authRouter);
app.use("/api/users",userRouter);

app.listen(process.env.PORT||7000, () => {
  console.log(`Server is listening to the port 7000`);
});
