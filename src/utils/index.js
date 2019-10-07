import jwt from "jsonwebtoken";
import { secret } from "../configs/const";

export const errorRes = (message, type, data) => ({
  message: message || null, // for error i18nKey -> [dict] -> text
  type, // "success" || "warning" || "error"
  data: data || null, // broadcast
});

export const generateJWT = (payload, expire) => {
  return jwt.sign(payload, secret, {
    expiresIn: expire,
  });
};

export const verifyJWT = token => {
  let bearer = token;
  if (token.indexOf("Bearer ") === 0) {
    bearer = token.replace("Bearer ", "");
  }

  const { id } = jwt.verify(bearer, secret);
  return id;
};

export const isEmptyObj = obj => !Object.keys(obj).length;

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
