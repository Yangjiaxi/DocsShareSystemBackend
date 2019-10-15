import socketIO from "socket.io";

import { logger } from "./utils/logger";
import { onChangeTitle } from "./actions/content";

export const socketServer = server => socketIO(server);

export const socketHandler = rootServer => {
  rootServer.on("connection", socket => {
    logger.info("New socket connected");
    const {
      handshake: {
        query: { id },
      },
    } = socket;
    socket.join(id);

    socket.on("changeTitle", onChangeTitle(socket));
  });
};
