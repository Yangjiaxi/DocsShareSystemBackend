import mongoose from "mongoose";
import { dbURI } from "../configs/const";
import { logger } from "../utils/logger";
import { forEachAsync } from "../utils/forEachAsync";
import { CounterRepo } from "./CounterRepo";

const { connect } = mongoose;

connect(
  dbURI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(err => logger.error(err.message));

export { DocRepo } from "./DocRepo";
export { CommentRepo } from "./CommentRepo";
export { UserRepo } from "./UserRepo";
export { CounterRepo } from "./CounterRepo";

const defaultSchema = [{ key: "doc", value: 0 }, { key: "user", value: 0 }];

export const initStatRepo = async () => {
  await forEachAsync(defaultSchema, async ({ key, value }) => {
    const record = (await CounterRepo.query({ key }))[0];
    if (!record) {
      await CounterRepo.createAndInsert({ key, value });
      logger.info(`Create Stat filed ${key} of {${value}}`);
    } else {
      // logger.info(`Stat filed ${key} already exist!`);
    }
  });
};
