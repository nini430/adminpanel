import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not Authorized");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(400).json("Invalid/Expired Token");
      if (data) {
        req.user = data;
        next();
      }
    });
  }
};
