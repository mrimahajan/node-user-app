import mongoose from 'mongoose';

export const getDBConnection = () => {
  const dbUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PWD}@${process.env.DB_URI}/Persons?retryWrites=true&w=majority`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // DB connections are async in nature
  mongoose
    .connect(dbUrl, options)
    .then(() => console.log('MongoDB Connected Successfully!!!'))
    .catch((err) => console.log('MongoDB Connect Error: ', err));
};
