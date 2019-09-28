import { errorRes, generateJWT } from '../../utils';
import { errorType } from '../../configs/errorType';

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email
      && email.trim() === 'yang'
      && password
      && password.trim() === '123456') {
      const token = generateJWT({ email: 'yang' }, '1d');
      res.json({ token, type: 'success' });
    } else {
      throw errorRes('Invalid Login Info', 'error', { err: errorType.BAD_LOGIN });
    }
  } catch (error) {
    return next(error);
  }
};
