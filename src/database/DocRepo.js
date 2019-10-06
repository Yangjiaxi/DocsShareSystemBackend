import { model } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

import { commentSchema } from "./CommentRepo";

// 文档信息 使用文档id进行管理
export const docSchema = createSchema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  recycled: {
    type: Boolean,
    default: false,
  },
  destroyed: {
    type: Boolean,
    default: false,
  },
  content: {
    type: [String],
    default: [],
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const DocModel = model("doc", docSchema);
export const DocRepo = new RepositoryBase(DocModel);
