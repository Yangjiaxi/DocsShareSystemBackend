import { model } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";
import { docSchema } from "./DocRepo";

// 用户信息
export const userSchema = createSchema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // after Salt
  password: {
    type: String,
    required: true,
  },
  // 注册时间
  regTime: {
    type: Number,
    required: true,
  },
  // 用户创建的文档
  ownedDocs: {
    type: [docSchema],
    default: [],
  },
  // 与用户分享的文档
  sharedDocs: {
    type: [docSchema],
    default: [],
  },
});

const UserModel = model("user", userSchema);
export const UserRepo = new RepositoryBase(UserModel);
