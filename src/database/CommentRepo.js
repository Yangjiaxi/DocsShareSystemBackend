import { model } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 一个评论
export const commentSchema = createSchema({
  content: {
    // pure string
    type: String,
    required: true,
  },
  time: {
    // upload time
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  voteUp: {
    type: Number,
    default: 0,
  },
  voteDown: {
    type: Number,
    default: 0,
  },
});

const CommentModel = model("comment", commentSchema);
export const CommentRepo = new RepositoryBase(CommentModel);
