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
  password: {
    hash: String,
    salt: String,
  },
  // 注册时间
  time: {
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
