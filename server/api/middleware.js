import { User } from '../db/index.js';

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default isLoggedIn;
