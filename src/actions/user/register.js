import { body, validationResult } from "express-validator";
import crypto from "crypto";

import { errorType } from "../../configs/errorType";
import { UserRepo, CounterRepo } from "../../database";

import { errorRes } from "../../utils";

export const userRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { msg } = errors.array({ onlyFirstError: true })[0];
      return next(errorRes(msg, "error"));
    }
    const { username, email, password } = req.body;

    if ((await UserRepo.query({ username }))[0]) {
      return next(errorRes(errorType.USERNAME_EXIST, "error"));
    }
    if ((await UserRepo.query({ email }))[0]) {
      return next(errorRes(errorType.EMAIL_EXIST, "error"));
    }

    const time = new Date();
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto.scryptSync(password, salt, 64).toString();

    await UserRepo.createAndInsert({
      username,
      email,
      password: { salt, hash },
      time,
    });

    await CounterRepo.update({ key: "user" }, { $inc: { value: 1 } });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const userRegisterVerify = [
  body("username")
    .isString()
    .isLength({ min: 6 })
    .withMessage(errorType.BAD_USERNAME),
  body("email")
    .isEmail()
    .withMessage(errorType.BAD_EMAIL),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage(errorType.BAD_PASSWORD),
];

// export const userComfirmEmail = async (req, res, next) => {
//   try {
//     res.json({ type: "success" });
//   } catch (error) {
//     return next(error);
//   }
// };
