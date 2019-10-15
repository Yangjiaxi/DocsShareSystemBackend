import { verifyJWT, errorRes } from "../../utils";
import { UserRepo, DocRepo } from "../../database";
import { errorType } from "../../configs/errorType";
import { logger } from "../../utils/logger";
import { io } from "../../app";

export const onChangeTitle = socket => async req => {
  try {
    const { id: docID, content, token } = req;
    const id = verifyJWT(token);
    const user = await UserRepo.queryById(id);
    if (!user) {
      return socket.emit(
        "changeTitleError",
        errorRes(errorType.NO_SUCH_USER, "error"),
      );
    }
    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return socket.emit(
        "changeTitleError",
        errorRes(errorType.NO_SUCH_DOC, "error"),
      );
    }

    if (content && content.length > 0) {
      await DocRepo.updateById(docID, { title: content });
      return io.sockets.in(docID).emit("changeTitle", { content });
    }

    return socket.emit(
      "changeTitleError",
      errorRes(errorType.TITLE_ZERO_LENGTH, "error"),
    );
  } catch ({ message }) {
    logger.error(message);
    return socket.emit("changeTitleError", errorRes(message, "error"));
  }
};
