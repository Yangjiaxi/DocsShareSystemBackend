import { logger } from "../utils/logger";

export const infoLogger = (req, res, next) => {
  const ip = req.get("X-Real-IP") || req.ip;
  logger.info(`[${ip}] [${req.method}] ${req.url} `);
  next();
};
