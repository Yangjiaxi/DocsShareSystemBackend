# 文档协同评注系统后台

前端：[https://github.com/Yangjiaxi/DocsShareSystemFrontend/](https://github.com/Yangjiaxi/DocsShareSystemFrontend/)

## APIs

### response

成功

```js
{
    type: "success",
    data: Object || null,
}
```

失败

```js
{
    type: "error" || "warning",
    message: String,
    data: Object || null
}
```

### 1. 用户`/user`

- (`[POST]`)`/register`
  - 注册
  - `email`
  - `username` : len >= 6
  - `password` : len >= 6
- (`[POST]`)`/login`
  - 登陆
  - `email`
  - `password`
  - `data: Bearer token`
- BELOW WITH `token`
- (`[GET]`)`/info`
  - 获取个人信息
- (`[PUT]`)`/info`
  - 修改个人信息
  - `email`
  - `username` : len >= 6
  - `password` : len >= 6

### 2. 文档`/doc`

- BELOW WITH `token`
- (`[GET]`) `/new`
  - 新建文档
  - `data: doc id`
- (`[GET]`) `/recent`
  - 获取最近使用的文档
  - `data: [{id, createTime, lastUse, owned(Bool), title, deleted(Bool)}]`
- (`[GET]`) `/my`
  - 获取最近使用的文档
  - `data: [{id, createTime, lastUse, owned(Bool)=true, title, deleted(Bool)=false}]`
- (`[GET]`) `/shared`
  - 获取与我共享的文档
  - `data: [{id, createTime, lastUse, owned(Bool), title, deleted(Bool)}]`
- (`[GET]`) `/trash`
  - 获取我删除的文档(可恢复)
  - `data: [{id, deleteTime, owned(Bool), title}]`
- (`[DELETE]`) `/delete/:docID`
  - 删除`docID`的文档
- (`[GET]`) `/restore/:docID`
  - 恢复`docID`的文档
- (`[DELETE]`) `/destroy/:docID`
  - 彻底删除`docID`的文档

- (`[GET]`) `/accept/:docID`
  - 打开某连接时触发，可能造成
    - 没有该文档或已被创建者删除 -> 报错
    - 与自己共享但被放入回收站 -> 从回收站取出
    - 与自己共享或为自己所有 -> Nothing
    - 没见过该文档 -> 被共享
