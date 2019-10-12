import { logger } from "./utils/logger";
import { initStatRepo, DocRepo, CommentRepo, FloorRepo } from "./database";
import { ObjectId } from "mongodb";

const id = "5d9e054895ba0128a7bfe131";
const add = async () => {
  const comment2 = await CommentRepo.createAndInsert({
    content: "Comment - 2",
    time: new Date(),
    username: "name - 2",
    voteUp: "123",
  });
  const floor2 = await FloorRepo.createAndInsert({
    content: "Content - 2",
    time: new Date(),
    comments: [comment2],
  });

  const floorID = ObjectId(floor2._id);
  await DocRepo.pushById(id, {
    content: floorID,
  });
  console.log("insert Finish");
};

export const tasks = async () => {
  await initStatRepo();
  logger.info("[T] Task loaded.");
  // await add();
};
