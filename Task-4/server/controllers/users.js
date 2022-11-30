import {db} from "../connect.js";


export const getUsers=(req,res)=>{
     const q="SELECT *,NULL AS `password` FROM users";
     db.query(q,(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data) {
         return res.status(200).json(data);
        };
     })
}

export const blockUsers=(req,res)=>{
   const q="UPDATE users SET status=? WHERE id IN (?)";
   db.query(q,["Blocked",[...req.body.ids]],(err,data)=>{
      if(err) return res.status(500).json(err);
      if(data) return res.status(200).json("User(s) have been blocked")
   })
}


export const unblockUsers=(req,res)=>{
   const q="UPDATE users SET `status`=? WHERE id IN(?)";
   db.query(q,["Active",[...req.body.ids]],(err,data)=>{
      if(err) return res.status(500).json(data);
      if(data) return res.status(200).json("User(s) have been unblocked");
   })
}

export const deleteUsers=(req,res)=>{
      const userIds=req.body.users.map(user=>user.id);
      const q="DELETE FROM users WHERE `id` IN (?)";
      db.query(q,[[...userIds]],(err,data)=>{
         if(err) return res.status(500).json(err);
         
         const q=`INSERT INTO deleted_users (\`userId\`,\`email\`) VALUES${req.body.users.length>1?'(?),'.repeat(req.body.users.length-1)+'(?)':'(?)'}`;
         db.query(q,[...req.body.users.map(user=>[user.id,user.email])],(err,data)=>{
            if(err) { 
               return res.status(500).json(err);

            }
            if(data) return res.status(200).json("Users are deleted");
         })
      })
}

