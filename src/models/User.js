import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    last_name: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    avatara: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
