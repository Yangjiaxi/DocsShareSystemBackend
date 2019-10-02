import mongoose from "mongoose";
import { dbURI } from "../configs/const";
import { logger } from "../utils/logger";

const { connect } = mongoose;

connect(
  dbURI,
  { useNewUrlParser: true, useFindAndModify: false },
)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(err => logger.error(err.message));

export { CommentRepo } from "./CommentRepo";
export { PostRepo } from "./DocRepo";
export { StatRepo } from "./StatRepo";
export { SayingRepo } from "./SayingRepo";
export { VisitRepo } from "./VisitRepo";
