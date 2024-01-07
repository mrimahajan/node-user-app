import fs from 'fs';
import { LOG_FILE_NAME } from '../constants/index.js';

export const handleLogging = (req, res, next) => {
  const logData = `${new Date()} \t ${req.ip} \t ${req.url} \t ${
    req.method
  } \t ${req.get('User-Agent')} \n`;
  fs.appendFile(LOG_FILE_NAME, logData, () => {
    next();
  });
};
