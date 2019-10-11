import { model, Schema } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 文档信息 使用文档_id进行管理
export const docSchema = createSchema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  // 放入回收站 (创建者行为)
  deleted: {
    type: Boolean,
    default: false,
  },
  // 销毁
  destroyed: {
    type: Boolean,
    default: false,
  },
  content: {
    type: [String],
    default: [],
  },
  comments: {
    // -> [floorSchema]
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const DocModel = model("doc", docSchema);
export const DocRepo = new RepositoryBase(DocModel);
