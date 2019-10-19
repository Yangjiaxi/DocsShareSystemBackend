import { UserRepo, DocRepo } from "../../database";

import { ObjectId } from "mongodb";
import { verifyJWT } from "../../utils";

export const updateTime = async (token, docID) => {
  try {
    const id = verifyJWT(token);
    const user = await UserRepo.queryById(id);
    if (!user) {
      return false;
    }

    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return false;
    }

    const { ownedDocs } = user;
    const isOwned = ownedDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );

    const { sharedDocs } = user;
    const isShared = sharedDocs.some(
      ({ id: innerID }) => innerID.toString() === docID,
    );

    if (isOwned) {
      await UserRepo.pullById(id, { ownedDocs: { id: ObjectId(docID) } });
      await UserRepo.pushById(id, {
        ownedDocs: {
          id: ObjectId(docID),
          lastUse: new Date(),
        },
      });
      return true;
    }

    if (isShared) {
      await UserRepo.pullById(id, { sharedDocs: { id: ObjectId(docID) } });
      await UserRepo.pushById(id, {
        sharedDocs: {
          id: ObjectId(docID),
          lastUse: new Date(),
        },
      });
      return true;
    }
  } catch (error) {
    return false;
  }
};
