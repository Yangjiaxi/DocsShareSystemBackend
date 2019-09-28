import { errorRes } from '../utils';
import { errorType } from '../configs/errorType';

export const noMatch = (req, res, next) => {
  if (!req.route) {
    return next(
      errorRes('No such path', 'error', { err: errorType.NO_SUCH_PATH }),
    );
  }
  return next();
};
