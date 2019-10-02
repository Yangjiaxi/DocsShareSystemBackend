import { model } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 对一个文档的评论
export const commentSchema = createSchema({
  uid: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const CommentModel = model("comment", commentSchema);
export const CommentRepo = new RepositoryBase(CommentModel);
