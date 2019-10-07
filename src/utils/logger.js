import fs from "fs";
import { getTimeString } from "./getTimeString";

// console.log(process.env.NODE_ENV);

let logInfo;
let logError;

if (process.env.NODE_ENV === "development") {
  logInfo = console.log;
  logError = console.error;
} else {
  logInfo = msg => fs.appendFile("./logs/stdout.log", `${msg}\n`, () => {});
  logError = msg => fs.appendFile("./logs/stderr.log", `${msg}\n`, () => {});
}

export const logger = {
  info: message => {
    logInfo(`${getTimeString()} | [I] ${message}`);
  },
  error: message => {
    logError(`${getTimeString()} | [E] ${message}`);
  },
};

export default logger;
