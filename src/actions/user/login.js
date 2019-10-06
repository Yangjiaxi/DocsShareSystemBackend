import { body, validationResult } from "express-validator";
import crypto from "crypto";

import { errorType } from "../../configs/errorType";
import { errorRes, generateJWT } from "../../utils";
import { UserRepo } from "../../database";

export const userLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { msg } = errors.array({ onlyFirstError: true })[0];
      return next(errorRes(msg, "error"));
    }
    const { email, password } = req.body;
    const user = (await UserRepo.query({ email }))[0];
    if (!user) {
      return next(errorRes(errorType.BAD_LOGIN, "error"));
    }

    const { hash, salt } = user.password;
    if (hash !== crypto.scryptSync(password, salt, 64).toString()) {
      return next(errorRes(errorType.BAD_LOGIN, "error"));
    }
    const token = generateJWT({ id: user._id }, 604800);
    res.json({ token, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const handleLoginVerify = [
  body("email")
    .isString()
    .withMessage(errorType.BAD_LOGIN),
  body("password")
    .isString()
    .withMessage(errorType.BAD_LOGIN),
];
