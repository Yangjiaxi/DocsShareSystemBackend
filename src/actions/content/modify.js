/*
Socket 相关操作
创建者：
1. 更改标题
2. 修改单元格
3. 删除单元格
4. 发布单元格
5. 修改稿件状态

共享者(&创建者) = 所有可以查看该文档的人：
1. 发布评论
2. 赞同评论
3. 点踩评论
*/

export const onModifyDoc = async (req, res, next) => {
  try {
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
