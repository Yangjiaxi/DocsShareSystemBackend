import { logger } from "./utils/logger";
import { initStatRepo } from "./database";

export const tasks = async () => {
  await initStatRepo();
  logger.info("[T] Task loaded.");
};
