import { DocRepo, UserRepo, CounterRepo } from "../../database";

export const createNewDoc = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const time = new Date();
    const doc = await DocRepo.createAndInsert({
      title: "Untitled Document",
      time,
    });
    await UserRepo.pushById(id, { ownedDocs: { id: doc, lastUse: time } });
    await CounterRepo.update({ key: "user" }, { $inc: { value: 1 } });
    res.json({ data: doc._id, type: "success" });
  } catch (error) {
    return next(error);
  }
};
