import mongoose from "mongoose";
import { dbURI } from "../configs/const";
import { logger } from "../utils/logger";

const { connect } = mongoose;

connect(
  dbURI,
  { useUnifiedTopology: true, useNewUrlParser: true },
)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(err => logger.error(err.message));

export { DocRepo } from "./DocRepo";
export { CommentRepo } from "./CommentRepo";
export { UserRepo } from "./UserRepo";
export { CounterRepo } from "./CounterRepo";
