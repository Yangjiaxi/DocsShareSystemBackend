import { verifyJWT, errorRes } from "../../utils";
import { UserRepo, DocRepo, FloorRepo } from "../../database";
import { errorType } from "../../configs/errorType";
import { logger } from "../../utils/logger";
import { io } from "../../app";

export const onDeleteFloor = socket => async req => {
  try {
    const { id: docID, floorID, token } = req;
    const id = verifyJWT(token);
    const user = await UserRepo.queryById(id);
    if (!user) {
      return socket.emit(
        "deleteFloorError",
        errorRes(errorType.NO_SUCH_USER, "error"),
      );
    }
    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return socket.emit(
        "deleteFloorError",
        errorRes(errorType.NO_SUCH_DOC, "error"),
      );
    }
    await FloorRepo.deleteById(floorID);
    await DocRepo.pullById(docID, { content: floorID });
    return io.sockets.in(docID).emit("deleteFloor", { id: floorID });
  } catch ({ message }) {
    logger.error(message);
    return socket.emit("deleteFloorError", errorRes(message, "error"));
  }
};
