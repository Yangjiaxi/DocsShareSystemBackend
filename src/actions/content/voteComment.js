import { verifyJWT, errorRes } from "../../utils";
import { UserRepo, DocRepo, CommentRepo } from "../../database";
import { errorType } from "../../configs/errorType";
import { logger } from "../../utils/logger";
import { io } from "../../app";

export const onVoteComment = socket => async req => {
  try {
    const { id: docID, token, floorID, commentID, vote } = req;
    const id = verifyJWT(token);
    const user = await UserRepo.queryById(id);
    if (!user) {
      return socket.emit(
        "voteCommentError",
        errorRes(errorType.NO_SUCH_USER, "error"),
      );
    }
    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return socket.emit(
        "voteCommentError",
        errorRes(errorType.NO_SUCH_DOC, "error"),
      );
    }

    if (vote === "UP") {
      await CommentRepo.updateById(commentID, { $inc: { voteUp: 1 } });
    } else if (vote === "DOWN") {
      await CommentRepo.updateById(commentID, { $inc: { voteDown: 1 } });
    } else {
      return socket.emit(
        "voteCommentError",
        errorRes(errorType.NO_SUCH_PATH, "error"),
      );
    }

    return io.sockets.in(docID).emit("voteComment", { floorID });
  } catch ({ message }) {
    logger.error(message);
    return socket.emit("voteCommentError", errorRes(message, "error"));
  }
};
