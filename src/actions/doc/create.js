export const createNewDoc = async (req, res, next) => {
  try {
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
