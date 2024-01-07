import express from 'express';
import {
  handleDeleteUser,
  handleFindUser,
  handleGetAllUsers,
  handleSetUser,
  handleUpdateUser,
  handleFilterUsers,
} from '../controllers/users.js';
import route from './route.json' assert { type: 'json' };
import { privateApi } from '../middlewares/privatePage.js';

const userRouter = express.Router();

userRouter.route('/').get(privateApi, handleGetAllUsers).post(handleSetUser);

userRouter.route(route.FILTER_USERS).get(handleFilterUsers);

userRouter
  .route('/:uid')
  .get(handleFindUser)
  .put(handleUpdateUser)
  .delete(handleDeleteUser);

export default userRouter;
