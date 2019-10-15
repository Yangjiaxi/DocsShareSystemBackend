import { verifyJWT, errorRes } from "../../utils";
import { UserRepo, DocRepo, FloorRepo } from "../../database";
import { errorType } from "../../configs/errorType";
import { logger } from "../../utils/logger";
import { io } from "../../app";

export const onChangeFloor = socket => async req => {
  try {
    const { id: docID, floorID, token, content } = req;
    const id = verifyJWT(token);
    const user = await UserRepo.queryById(id);
    if (!user) {
      return socket.emit(
        "changeFloorError",
        errorRes(errorType.NO_SUCH_USER, "error"),
      );
    }
    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return socket.emit(
        "changeFloorError",
        errorRes(errorType.NO_SUCH_DOC, "error"),
      );
    }
    const info = {
      content,
      time: new Date(),
    };
    await FloorRepo.updateById(floorID, info);

    return io.sockets.in(docID).emit("changeFloor", { ...info, id: floorID });
  } catch ({ message }) {
    logger.error(message);
    return socket.emit("changeFloorError", errorRes(message, "error"));
  }
};
