import { verifyJWT, errorRes } from "../../utils";
import { UserRepo, DocRepo, FloorRepo, CommentRepo } from "../../database";
import { errorType } from "../../configs/errorType";
import { logger } from "../../utils/logger";
import { ObjectId } from "mongodb";
import { io } from "../../app";

export const onAddComment = socket => async req => {
  try {
    const { id: docID, token, floorID, content } = req;
    const id = verifyJWT(token);
    const user = await UserRepo.queryById(id);
    if (!user) {
      return socket.emit(
        "addCommentError",
        errorRes(errorType.NO_SUCH_USER, "error"),
      );
    }
    const doc = await DocRepo.queryById(docID);
    if (!doc) {
      return socket.emit(
        "addCommentError",
        errorRes(errorType.NO_SUCH_DOC, "error"),
      );
    }
    const newComment = await CommentRepo.createAndInsert({
      content,
      time: new Date(),
      username: user.username,
    });
    const commentID = ObjectId(newComment._id);
    await FloorRepo.pushById(floorID, { comments: commentID });

    return io.sockets.in(docID).emit("addComment", { floorID });
  } catch ({ message }) {
    logger.error(message);
    return socket.emit("addCommentError", errorRes(message, "error"));
  }
};
