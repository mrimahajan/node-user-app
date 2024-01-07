import { JWT_COOKIE_NAME } from '../constants/index.js';
import User from '../models/User.js';
import { getFilterUserObj } from '../utils/filterUsers.js';
import userData from './../../data/users.json' assert { type: 'json' };
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const handleHomePageResponse = (req, res) => {
  //res.send('<h1 style="text-align:center">Dashboard<h1>');
  res.render('dashboard',{first_name:'Guest',isLogin: false});
};

export const handleFilterUsers = async (req, res) => {
  const qs = req.query;
  const dataModel = {};
  dataModel.qs = qs;
  try {
    if (Object.keys(qs).length === 0) {
      // Only show search filters
      dataModel.isSearchResult = false;
      dataModel.isError = false;
    } else {
      // search
      const filters = getFilterUserObj(qs);
      const users = await User.find(filters);
      if (users.length === 0) {
        throw new Error('No users found');
      }
      dataModel.users = users;
      dataModel.isSearchResult = true;
      dataModel.isError = false;
    }
  } catch (err) {
    console.log(err);
    dataModel.isSearchResult = false;
    dataModel.isError = true;
  }
  res.render('filterUsers', dataModel);
};

export const handleSignUpUser = async (req, res) => {
  const { first_name, last_name, age = '', email, password } = req.body;
  // TODO: server side validation
  try {
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    const user = new User({
      first_name,
      last_name,
      age,
      email,
      password: hashedPassword,
    });
    await user.save();
    // TODO: show the success message
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
};

export const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new Error('Authentication Failed');
    }
    
    // Create session cookie - Stateful Authentication
    // req.session.user = {
    //   id: user._id,
    //   email,
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   age: user.age,
    // };

    //Stateless Authentication JWT
    const payLoad = {
      id: user._id,
      email,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
    };
    // Create and sign token
    const token = jwt.sign(payLoad, process.env.JWT_SECRET);
    //Send token to client - Header or Cookie
    res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true });
    res.redirect('dashboard');

    res.send();
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .render('login', { errorMsg: 'Invalid username or password !!!' });
  }
};

export const handleDashboard = (req, res) => {
  const model = { first_name: 'Guest', isLogin: false };
  if (req.user?.first_name) {
    model.first_name = req.user.first_name;
    model.isLogin = true;
  }
  res.render('dashboard', model);
};

export const handleLogoutUser = (req, res) => {
  // Stateful Logout
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.clearCookie('connect.sid').status(302).redirect('/login');
  // });

  //Stateless Logout
  res.clearCookie(JWT_COOKIE_NAME).status(302).redirect('/login');

};

export const handleShowAllUsers = (req, res) => {
  const userList = `
  <ul>
    ${userData
      .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
      .join('')}
  </ul>`;
  res.send(`
    <h1 style="text-align:center">User List</h1>
    <div>
        ${userList}
    </div>`);
};
