const jwt= require("jsonwebtoken");
const {errorHandler} = require("./errors")

exports.checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) 
    return next(errorHandler({status: 401, message: "Unauthorized"})); 
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) 
      return next(errorHandler({status: 401,
        message: "Invalid Token"
      }));
    req.user = decoded;
    return next();
  });
};
