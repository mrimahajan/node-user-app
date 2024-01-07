import bcrypt from 'bcrypt';
import {
  isAtLeastThreeChars,
  isOnlyAlphabets,
  isValidEmailId,
  isValidUrl,
} from '../utils/validators.js';
import User from '../models/User.js';
import { getFilterUserObj } from '../utils/filterUsers.js';

export const handleGetAllUsers = async (req, res) => {
  // Setting the custom header
  //res.setHeader('X-user-data', 'Tarun');
  //res.json(userData);
  try {
    const usersData = await User.find({});
    res.json(usersData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Rejected' });
  }
};

export const handleSetUser = async (req, res) => {
  const user = req.body;
  // We should have validation logic
  if (
    !(
      user.first_name &&
      user.last_name &&
      user.email &&
      user.avatara &&
      user.password &&
      isAtLeastThreeChars(user.first_name) &&
      isAtLeastThreeChars(user.last_name) &&
      isOnlyAlphabets(user.first_name) &&
      isOnlyAlphabets(user.last_name) &&
      isValidEmailId(user.email) &&
      isValidUrl(user.avatara)
    )
  ) {
    res.status(400).json({ status: 'Rejected' });
    return;
  }
  /*
  const id = userData[userData.length - 1].id + 1;
  const users = [...userData, { id, ...user }];
  fs.writeFile(USERS_FILE_NAME, JSON.stringify(users), (err) => {
    if (err) console.log(err);
    res.status(201).json({ status: 'success', id });
  });
  */
  try {
    const hashedPassword = await bcrypt.hash(user.password, +process.env.SALT);
    const userModel = new User({ ...user, password: hashedPassword });
    const savedData = await userModel.save();
    const updatedUserObject = savedData.toObject();
    delete updatedUserObject.password;
    res.status(201).json(updatedUserObject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Rejected' });
  }
};

export const handleFindUser = async (req, res) => {
  const { uid } = req.params;
  // const data = userData.find((user) => user.id == uid);
  // if (data) {
  //   res.json(data);
  // }
  // res.status(404).json({});
  try {
    const user = await User.findById(uid);
    user
      ? res.json(user)
      : res.status(404).json({ err: 404, status: 'Not Found' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Rejected' });
  }
};

export const handleUpdateUser = async (req, res) => {
  const { uid } = req.params;
  const updatedData = req.body;
  // const index = userData.findIndex((user) => user.id == uid);
  // if (index !== -1) {
  //   userData[index] = { ...userData[index], ...updatedData };

  //   fs.writeFile(USERS_FILE_NAME, JSON.stringify(userData), (err) => {
  //     if (err) console.log(err);
  //     res.json({ status: 'Success', id: uid });
  //   });
  // } else {
  //   res.status(400).json({ status: 'Rejected', id: uid });
  // }

  try {
    const user = await User.findByIdAndUpdate(uid, updatedData, { new: true });
    user
      ? res.json(user)
      : res.status(404).json({ err: 404, status: 'Not Found' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Rejected' });
  }
};

export const handleDeleteUser = async (req, res) => {
  // const { uid } = req.params;
  // res.json({ status: 'pending', id: uid });
  const { uid } = req.params;

  // const index = userData.findIndex((user) => user.id == uid);
  // if (index !== -1) {
  //   userData.splice(index, 1);
  //   fs.writeFile(USERS_FILE_NAME, JSON.stringify(userData), (err) => {
  //     if (err) console.log(err);
  //     res.status(204).send();
  //   });
  // } else {
  //   res.status(400).json({ status: 'Rejected', id: uid });
  // }

  try {
    const user = await User.findByIdAndDelete(uid);
    user
      ? res.status(204).send()
      : res.status(404).json({ err: 404, status: 'Not Found' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Rejected' });
  }
};

export const handleFilterUsers = async (req, res) => {
  const qs = req.query;
  const filters = getFilterUserObj(qs);
  try {
    const users = await User.find(filters);
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Rejected' });
  }
};
