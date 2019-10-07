import { model, Schema } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

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
    type: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        lastUse: {
          type: Number,
        },
      },
    ],
    default: [],
  },
  // 与用户分享的文档
  sharedDocs: {
    type: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        lastUse: {
          type: Number,
        },
      },
    ],
    default: [],
  },
  // 移动到回收站的文档
  trashDocs: {
    type: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        time: {
          type: Number,
        },
      },
    ],
    default: [],
  },
});

const UserModel = model("user", userSchema);
export const UserRepo = new RepositoryBase(UserModel);
