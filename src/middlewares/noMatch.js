import { errorRes } from "../utils";
import { errorType } from "../configs/errorType";

export const noMatch = (req, res, next) => {
  if (!req.route) {
    return next(errorRes(errorType.NO_SUCH_PATH, "error"));
  }
  return next();
};
