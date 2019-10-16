import { verifyJWT, errorRes } from "../../utils";
import { UserRepo, DocRepo, FloorRepo } from "../../database";
import { errorType } from "../../configs/errorType";
import { logger } from "../../utils/logger";
import { ObjectId } from "mongodb";
import { io } from "../../app";

export const onAppendFloor = socket => async req => {
  try {
    const { id: docID, token } = req;
    const id = verifyJWT(token);
    const user = await UserRepo.queryById(id);
    if (!user) {
      return socket.emit(
        "appendFloorError",
        errorRes(errorType.NO_SUCH_USER, "error"),
      );
    }
    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return socket.emit(
        "appendFloorError",
        errorRes(errorType.NO_SUCH_DOC, "error"),
      );
    }
    const info = {
      content: "new floor",
      time: new Date(),
    };
    const newFloor = await FloorRepo.createAndInsert(info);

    const floorID = ObjectId(newFloor._id);
    await DocRepo.pushById(docID, {
      content: floorID,
    });

    return io.sockets.in(docID).emit("appendFloor", { ...info, id: floorID });
  } catch ({ message }) {
    logger.error(message);
    return socket.emit("appendFloorError", errorRes(message, "error"));
  }
};
