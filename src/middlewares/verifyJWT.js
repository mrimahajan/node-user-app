import jwt from 'jsonwebtoken';
import { JWT_COOKIE_NAME } from '../constants/index.js';

export const verifyJWT = async (req, res, next) => {
 const token = req.header('Authorization') || req.cookies?.[JWT_COOKIE_NAME];  
  if (!token) {
    //token not found
    req.user = null;
      return next();
  }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        req.user = err ? null : user;
        next();
  });
};