import { UserRepo, DocRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorType } from "../../configs/errorType";

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

    // 不拥有也不被共享，说明被共享
    if (!isOwned && !isShared) {
      await UserRepo.pushById(id, {
        sharedDocs: { id: docID, lastUse: new Date() },
      });
    }

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
