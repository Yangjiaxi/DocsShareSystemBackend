import { UserRepo, DocRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorType } from "../../configs/errorType";

/*
用户id接受分享 -> docID
1. docID 不存在 -> err
2. 从id的trash中剔除docID (接受分享->从垃圾箱中回收)
3. id是docID的所有者 或 id被共享docID -> 正常返回
4. shared数组压入docID -> 返回
*/

export const acceptShare = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const { docID } = req.params;

    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }

    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return next(errorRes(errorType.NO_SUCH_DOC, "error"));
    }

    const { deleted, destroyed } = doc;
    if (deleted || destroyed) {
      return next(errorRes(errorType.ALREADY_DELETED, "error"));
    }

    await UserRepo.pullById(id, { trashDocs: { id: docID } });

    const { ownedDocs } = user;
    const isOwned = ownedDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );

    const { sharedDocs } = user;
    const isShared = sharedDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );

    // 不拥有也不被共享，说明可以被共享
    if (!isOwned && !isShared) {
      await UserRepo.pushById(id, {
        sharedDocs: { id: docID, lastUse: new Date() },
      });
      res.json({ data: true, type: "success" });
    } else {
      res.json({ data: false, type: "success" });
    }
  } catch (error) {
    return next(error);
  }
};
