import { logger } from "./utils/logger";
import { initStatRepo, DocRepo, CommentRepo, FloorRepo } from "./database";
import { ObjectId } from "mongodb";

const id = "5d9e054895ba0128a7bfe131";
const add = async () => {
  const comment21 = await CommentRepo.createAndInsert({
    content: "Comment - 21",
    time: new Date(),
    username: "name - 21",
    voteUp: "123",
  });
  const comment22 = await CommentRepo.createAndInsert({
    content: "Comment - 22",
    time: new Date(),
    username: "name - 22",
    voteUp: "123",
  });
  const floor2 = await FloorRepo.createAndInsert({
    content: "Content - 2",
    time: new Date(),
    comments: [comment21, comment22],
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
