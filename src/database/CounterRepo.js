import { model } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 统计信息
const counterSchema = createSchema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const CounterModel = model("counter", counterSchema);
export const CounterRepo = new RepositoryBase(CounterModel);
