import { body, validationResult } from "express-validator";
import crypto from "crypto";

import { UserRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorType } from "../../configs/errorType";

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await UserRepo.queryById(res.locals.id);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }
    const { _id, username, email, time } = user;
    res.json({ data: { _id, username, email, time }, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const modifyUserInfo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { msg } = errors.array({ onlyFirstError: true })[0];
      return next(errorRes(msg, "error"));
    }

    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes("User doesn't exist!", "warning"));
    }
    const { username, email, password } = req.body;

    if (password && typeof password === "string") {
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto.scryptSync(password, salt, 64).toString();
      await UserRepo.updateById(id, {
        password: {
          salt,
          hash,
        },
      });
    }

    await UserRepo.updateById(id, {
      username,
      email,
    });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const modifyUserInfoVerify = [
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
