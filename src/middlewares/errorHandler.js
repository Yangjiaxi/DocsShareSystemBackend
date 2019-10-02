import { logger } from "../utils/logger";

export const errorHandler = (error, req, res, next) => {
  const { message, type, data } = error;
  logger.error(message);
  res.json({ message, type: type || "error", data: data || null });
  next();
};
