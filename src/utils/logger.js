import fs from 'fs';
import { getTimeString } from './getTimeString';

// console.log(process.env.NODE_ENV);

let logInfo;
let logError;

if (process.env.NODE_ENV === 'development') {
  logInfo = { write: console.log };
  logError = { write: console.error };
} else {
  logInfo = fs.createWriteStream('./logs/stdout.log');
  logError = fs.createWriteStream('./logs/stderr.log');
}

export const logger = {
  info: (message) => {
    logInfo.write(`${getTimeString()} | [INFO] ${message}\n`);
  },
  error: (message) => {
    logError.write(`${getTimeString()} | [ERROR] ${message}\n`);
  },
};

export default logger;
