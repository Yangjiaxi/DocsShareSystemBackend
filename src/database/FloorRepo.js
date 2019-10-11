import { model, Schema } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 一个单元格与评论
export const floorSchema = createSchema({
  content: {
    // markdown string
    type: String,
    required: true,
  },
  time: {
    // last mod time
    type: Number,
    required: true,
  },
  comments: {
    // -> commentSchema
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const FloorModel = model("floor", floorSchema);
export const FloorRepo = new RepositoryBase(FloorModel);
