import socketIO from "socket.io";

import { logger } from "./utils/logger";
import {
  onChangeTitle,
  onAppendFloor,
  onChangeFloor,
  onDeleteFloor,
  onAddComment,
  onVoteComment,
  onMoveFloor,
} from "./actions/content";
import { updateTime } from "./actions/doc";

export const socketServer = server => socketIO(server);

export const socketHandler = rootServer => {
  rootServer.on("connection", socket => {
    logger.info("New socket connected");

    const { token, id } = socket.handshake.query;

    socket.join(id);
    socket.emit("connected");

    socket.on("changeTitle", onChangeTitle(socket));
    socket.on("appendFloor", onAppendFloor(socket));
    socket.on("changeFloor", onChangeFloor(socket));
    socket.on("deleteFloor", onDeleteFloor(socket));
    socket.on("moveFloor", onMoveFloor(socket));
    socket.on("addComment", onAddComment(socket));
    socket.on("voteComment", onVoteComment(socket));

    const timer = setInterval(() => {
      if (!updateTime(token, id)) {
        clearInterval(timer);
      }
    }, 5000);

    socket.on("disconnect", () => {
      if (timer) clearInterval(timer);
    });
  });
};
