import { model } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

import { commentSchema } from "./CommentRepo";

// 文档信息 使用文档id进行管理
export const docSchema = createSchema({
  // pid: {
  //   type: Number,
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const DocModel = model("doc", docSchema);
export const DocRepo = new RepositoryBase(DocModel);
