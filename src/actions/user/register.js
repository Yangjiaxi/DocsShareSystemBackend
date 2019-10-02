export const userRegister = async (req, res, next) => {
  try {
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

// export const userComfirmEmail = async (req, res, next) => {
//   try {
//     res.json({ type: "success" });
//   } catch (error) {
//     return next(error);
//   }
// };
