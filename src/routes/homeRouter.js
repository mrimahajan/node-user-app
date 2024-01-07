import express from "express";
import route from "./route.json" assert { type: "json" };
import fs from 'fs';
import {
  handleDashboard,
  handleFilterUsers,
  handleHomePageResponse,
  handleLoginUser,
  handleLogoutUser,
  handleShowAllUsers,
  handleSignupUsers,
} from "../controllers/home.js";
import { privatePage, redirectToDashboard } from "../middlewares/privatePage.js";

const homeRouter = express.Router();

homeRouter.get(route.HOME, handleHomePageResponse);

homeRouter.get(route.USERS,privatePage, handleShowAllUsers);

homeRouter.get(route.FILTER_USER, privatePage, handleFilterUsers);

homeRouter.get(route.LOGIN, redirectToDashboard,(req, res) => res.render('login', {errorMsg:''}));
homeRouter.get(route.SIGN,redirectToDashboard, (req, res) => res.render('signup'));

homeRouter.post(route.SIGN, handleSignupUsers);
homeRouter.post(route.LOGIN, handleLoginUser);

homeRouter.get(route.DASHBOARD, handleDashboard);
homeRouter.get(route.LOGOUT, handleLogoutUser);

homeRouter.get('/ebook', (req, res) => {
  //fs.createReadStream('data/ebook.txt', 'utf-8').pipe(res);
  const filestream = fs.createReadStream('data/ebook.txt', {
    encoding: 'utf-8',
    highWaterMark: 1024,
  });
  
  filestream.on('data', (chunk) => {
    res.write(chunk);
  });

  filestream.on('end', () => {
    res.end();
  });

  filestream.on('error', (err) => {
    console.log(err);
  });
}
);

export default homeRouter;
