import { DocRepo, UserRepo, FloorRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorType } from "../../configs/errorType";
import { forEachAsync } from "../../utils/forEachAsync";
import { ObjectId } from "mongodb";

export const checkoutDocInfo = async (req, res, next) => {
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

    const { content, _id, time, title } = doc;
    const contentQuery = await Promise.all(
      content.map(async innerID => FloorRepo.queryById(innerID)),
    );

    res.json({ contents: contentQuery, title, time, id: _id, type: "success" });
  } catch (error) {
    return next(error);
  }
};
