export const getUserInfo = async (req, res, next) => {
  try {
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const modifyUserInfo = async (req, res, next) => {
  try {
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
