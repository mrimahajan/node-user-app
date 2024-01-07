//import dotenv from 'dotenv';
import 'dotenv/config.js';
import app from './src/app.js';
import { getDBConnection } from './src/db/index.js';

// call env config
// dotenv.config();

getDBConnection();

// Listen the server
app.listen(process.env.PORT, () =>
  console.log(
    `Server started successfully at http://${process.env.HOSTNAME}:${process.env.PORT}/`
  )
);
