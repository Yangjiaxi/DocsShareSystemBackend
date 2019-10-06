import { errorRes, verifyJWT } from "../utils";
import { errorType } from "../configs/errorType";

export const jwtChecker = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const jwt = req.get("Authorization");
  if (!jwt) {
    return next(errorRes(errorType.NO_JWT, "error"));
  }
  try {
    res.locals.id = verifyJWT(jwt);
    next();
  } catch (e) {
    return next(errorRes(errorType.INVALID_JWT, "error"));
  }
};
