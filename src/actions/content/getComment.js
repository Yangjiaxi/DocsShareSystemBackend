import { UserRepo, FloorRepo, CommentRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorType } from "../../configs/errorType";

export const getComment = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const { commentID } = req.params;

    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorType.NO_SUCH_USER, "error"));
    }

    const floor = await FloorRepo.queryById(commentID);
    if (!floor) {
      return next(errorRes(errorType.NO_SUCH_PATH, "error"));
    }

    const { comments } = floor;
    const commentsArray = await Promise.all(
      comments.map(async innerID => CommentRepo.queryById(innerID)),
    );

    res.json({
      data: {
        id: commentID,
        comments: commentsArray,
      },
      type: "success",
    });
  } catch (error) {
    return next(error);
  }
};
