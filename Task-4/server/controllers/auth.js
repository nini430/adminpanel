import {db} from "../connect.js"
import moment from "moment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registrationValidation,loginValidation } from "../utils/validators.js";


export const register=(req,res)=>{
    const {name,email,password,confirmPassword,img}=req.body;
    if(req.body.reregister) {
        const q="DELETE FROM deleted_users WHERE email=?";
        db.query(q,[req.body.email],(err,data)=>{
            if(err) return res.status(500).json(data);
            
        })
    }
        const {errors,isInvalid}=registrationValidation(name,email,password,confirmPassword);
        if(isInvalid) {
            return res.status(400).json(errors);
        }
    const q="SELECT * FROM users WHERE `email`=?";  
    db.query(q,[email],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) {
            errors.email="User with this E-mail or name is Already registered";
            return res.status(409).json(errors);
        }
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(password,salt);

        const q="INSERT INTO users (`name`,`email`,`registration_date`,`password`,`img`) VALUES(?)";
        const values=[name,email,moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),hashedPassword,img]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            if(data) return res.status(201).json("User has been registered");
        })
    })


}

export const login=(req,res)=>{
       
    const {email,password}=req.body;

    const {errors,isInvalid}=loginValidation(email,password);

    if(isInvalid) {
        return res.status(400).json(errors);
    }
        
    
    const q="SELECT * FROM users WHERE `email`=?";

    db.query(q,[email],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length===0) {
            errors.email="User not Found"
            return res.status(404).json(errors)
        }

        

        const isPasswordCorrect=bcrypt.compareSync(req.body.password,data[0].password);

        if(!isPasswordCorrect) {
            errors.password="Email or password is not correct"
            errors.email="Email or password is not correct"
            return res.status(400).json(errors);
        }

        if(data[0].status==="Blocked") {
            errors.block="You are Blocked. You can't go into your account!";
            return res.status(403).json(errors);
        }

        const q="UPDATE users SET `last_login`=? WHERE id=?";
        db.query(q,[moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),data[0].id],(err,data)=>{
            if(err) return res.status(500).json(err);
           
        });

        const token=jwt.sign({id:data[0].id},process.env.JWT_SECRET);

        const {password,...others}=data[0]

         res.cookie("access_token",token,{httpOnly:true,sameSite:"none",secure:true,secret:"secret"}).status(200).json(others);
    })
}

export const logout=(req,res)=>{
    return res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out");
}

