import { UserRepo, DocRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorType } from "../../configs/errorType";
import { forEachAsync } from "../../utils/forEachAsync";

// 所有近期使用过的文档(自己的+分享的), 按时间排序，不包括移动到垃圾箱的

// 创建人 -> 删除 -> 在trashArray中 -> 不会显示
// 共享者 -> 不在trashArray中 -> query后发现被创建人删除 -> 提示"被删除"
export const getRecent = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }
    const { ownedDocs, sharedDocs, trashDocs } = user;
    const trashArray = [];
    trashDocs.forEach(({ id: innerID }) => trashArray.push(innerID.toString()));
    const data = [];

    await forEachAsync(ownedDocs, async ({ id: innerID, lastUse }) => {
      if (!trashArray.includes(innerID.toString())) {
        const doc = await DocRepo.queryById(innerID);
        if (doc) {
          const { title, time } = doc;
          data.push({
            id: innerID,
            createTime: time,
            lastUse,
            owned: true,
            title,
            deleted: false,
          });
        }
      }
    });

    await forEachAsync(sharedDocs, async ({ id: innerID, lastUse }) => {
      if (!trashArray.includes(innerID.toString())) {
        const doc = await DocRepo.queryById(innerID);
        if (doc) {
          const { title, time, deleted, destroyed } = doc;
          data.push({
            id: innerID,
            createTime: time,
            lastUse,
            owned: false,
            title,
            deleted: deleted || destroyed,
          });
        }
      }
    });
    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const getMine = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }
    const { ownedDocs, trashDocs } = user;
    const trashArray = [];
    trashDocs.forEach(({ id: innerID }) => trashArray.push(innerID.toString()));
    const data = [];

    await forEachAsync(ownedDocs, async ({ id: innerID, lastUse }) => {
      if (!trashArray.includes(innerID.toString())) {
        const doc = await DocRepo.queryById(innerID);
        if (doc) {
          const { title, time } = doc;
          data.push({
            id: innerID,
            createTime: time,
            lastUse,
            owned: true,
            title,
            deleted: false,
          });
        }
      }
    });
    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};

// 与用户共享的，不包括删除的
export const getShared = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }
    const { sharedDocs, trashDocs } = user;
    const trashArray = [];
    trashDocs.forEach(({ id: innerID }) => trashArray.push(innerID.toString()));

    const data = [];
    await forEachAsync(sharedDocs, async ({ id: innerID, lastUse }) => {
      if (!trashArray.includes(innerID.toString())) {
        const doc = await DocRepo.queryById(innerID);
        if (doc) {
          const { title, time, deleted, destroyed } = doc;
          data.push({
            id: innerID,
            createTime: time,
            lastUse,
            owned: false,
            title,
            deleted: deleted || destroyed,
          });
        }
      }
    });
    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};

// 垃圾箱内的所有内容
export const getTrash = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }
    const { ownedDocs, sharedDocs, trashDocs } = user;

    const ownedArray = [];
    const sharedArray = [];
    ownedDocs.forEach(({ id: docID }) => ownedArray.push(docID.toString()));
    sharedDocs.forEach(({ id: docID }) => sharedArray.push(docID.toString()));

    const data = [];

    await forEachAsync(trashDocs, async ({ id: docID, time }) => {
      if (ownedArray.includes(docID.toString())) {
        const doc = await DocRepo.queryById(docID);
        if (doc) {
          const { title } = doc;
          data.push({
            id: docID,
            deleteTime: time,
            owned: true,
            title,
          });
        }
      } else if (sharedArray.includes(docID.toString())) {
        const doc = await DocRepo.queryById(docID);
        if (doc) {
          const { title } = doc;
          data.push({
            id: docID,
            deleteTime: time,
            owned: false,
            title,
          });
        }
      }
    });
    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};
