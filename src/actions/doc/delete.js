import { UserRepo, DocRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorType } from "../../configs/errorType";

export const moveToTrash = async (req, res, next) => {
  try {
    const { docID } = req.params;
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }
    const { trashDocs } = user;
    const isTrashed = trashDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );

    const { ownedDocs } = user;
    const isOwned = ownedDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );

    const { sharedDocs } = user;
    const isShared = sharedDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );

    if (!(isOwned || isShared)) {
      return next(errorRes(errorType.NO_SUCH_DOC, "error"));
    }
    if (isTrashed) {
      return next(errorRes(errorType.ALREADY_DELETED, "error"));
    }
    if (isOwned) {
      await DocRepo.updateById(docID, { deleted: true });
    }
    await UserRepo.pushById(id, {
      trashDocs: {
        id: docID,
        time: new Date(),
      },
    });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

// 从垃圾箱恢复文档
// 所有者 -> 从trashDocs中删除 -> 修改DocRepo中deleted标记
// 共享者 -> 从trashDocs中删除
export const restoreFromTrash = async (req, res, next) => {
  try {
    const { docID } = req.params;
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    const doc = await DocRepo.queryById(docID);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }
    if (!doc) {
      return next(errorRes(errorType.NO_SUCH_DOC, "error"));
    }

    const { ownedDocs } = user;
    const isOwned = ownedDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );

    if (isOwned) {
      await DocRepo.updateById(docID, { deleted: false });
    }
    await UserRepo.pullById(id, { trashDocs: { id: docID } });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

// 彻底删除一个文档
// 所有者 -> 从ownedDocs与trashDocs中移除 -> 添加destroyed:true
// 共享者 -> 从sharedDocs与trashDocs中移除
export const deleteForever = async (req, res, next) => {
  try {
    const { docID } = req.params;
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    const doc = await DocRepo.queryById(docID);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }
    if (!doc) {
      return next(errorRes(errorType.NO_SUCH_DOC, "error"));
    }

    await UserRepo.pullById(id, { sharedDocs: { id: docID } });
    await UserRepo.pullById(id, { trashDocs: { id: docID } });

    const { ownedDocs } = user;
    const isOwned = ownedDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );
    if (isOwned) {
      await DocRepo.updateById(docID, { destroyed: true });
      await UserRepo.pullById(id, { ownedDocs: { id: docID } });
    }

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
