import { errorRes, verifyJWT } from "../utils";
import { errorType } from "../configs/errorType";

export const checker = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const jwt = req.get("Authorization");
  if (!jwt) {
    return next(
      errorRes("No JWT provided!", "error", { err: errorType.NO_JWT }),
    );
  }
  try {
    verifyJWT(jwt);
    next();
  } catch (e) {
    return next(
      errorRes("Invalid JWT!", "error", { err: errorType.INVALID_JWT }),
    );
  }
};
