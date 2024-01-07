import express from 'express';
import fs from 'fs';
import route from './route.json' assert { type: 'json' };
import {
  handleHomePageResponse,
  handleShowAllUsers,
  handleFilterUsers,
  handleSignUpUser,
  handleLoginUser,
  handleDashboard,
  handleLogoutUser,
} from '../controllers/home.js';
import {
  privatePage,
  redirectToDashboard,
} from '../middlewares/privatePage.js';

const homeRouter = express.Router();

homeRouter.get(route.HOME, handleHomePageResponse);

// Authentication routes example
homeRouter.get(route.USERS, privatePage, handleShowAllUsers);

homeRouter.get(route.FILTER_USERS, privatePage, handleFilterUsers);

homeRouter.get(route.DASHBOARD, handleDashboard);

homeRouter.get(route.LOGIN, redirectToDashboard, (req, res) =>
  res.render('login', { errorMsg: '' })
);
homeRouter.post(route.LOGIN, handleLoginUser);

homeRouter.get(route.SIGN, redirectToDashboard, (req, res) =>
  res.render('signup')
);
homeRouter.post(route.SIGN, handleSignUpUser);

homeRouter.get(route.LOGOUT, handleLogoutUser);

// stream
homeRouter.get('/ebook', (req, res) => {
  //const fileStream = fs.createReadStream('data/ebook.txt', 'utf-8');
  const fileStream = fs.createReadStream('data/ebook.txt', {
    encoding: 'utf-8',
    //highWaterMark: 1024,
  });

  fileStream.on('data', (chunk) => res.write(chunk));
  fileStream.on('end', () => res.end());
  fileStream.on('error', (err) => console.log(err));

  // fs.readFile('data/ebook.txt', 'utf-8', (err, data) => {
  //   if (err) console.log(err);
  //   res.send(data);
  // });
});

export default homeRouter;
