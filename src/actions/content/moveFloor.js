import { verifyJWT, errorRes } from "../../utils";
import { UserRepo, DocRepo } from "../../database";
import { errorType } from "../../configs/errorType";
import { logger } from "../../utils/logger";
import { io } from "../../app";

export const onMoveFloor = socket => async req => {
  try {
    const { id: docID, token, from, to } = req;
    const id = verifyJWT(token);
    const user = await UserRepo.queryById(id);
    if (!user) {
      return socket.emit(
        "moveFloorError",
        errorRes(errorType.NO_SUCH_USER, "error"),
      );
    }
    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return socket.emit(
        "moveFloorError",
        errorRes(errorType.NO_SUCH_DOC, "error"),
      );
    }

    await DocRepo.updateById(docID, {
      [`content.${from}`]: doc.content[to],
      [`content.${to}`]: doc.content[from],
    });

    return io.sockets.in(docID).emit("moveFloor", { from, to });
  } catch ({ message }) {
    logger.error(message);
    return socket.emit("moveFloorError", errorRes(message, "error"));
  }
};
