import {db} from "../connect.js"

export const checkRegister=(req,res,next)=>{
     const q="SELECT * FROM deleted_users WHERE email=?";

     db.query(q,[req.body.email],(err,data)=>{
            if(err) return res.status(500).json(err);

            if(data.length) {
                return res.status(200).json({modal:`User with this Email -  ${req.body.email} have been deleted. Do you want to re-register?`});
            }else{
                next();
            }
     })
}