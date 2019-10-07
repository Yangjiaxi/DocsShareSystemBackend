# 文档协同评注系统后台

## APIs

### response

成功

```json
{
    type: "success",
    data: Object || null,
}
```

失败

```json
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
- (`[GET]`) `/shared`
  - 获取与我共享的文档
  - `data: [{id, createTime, lastUse, owned(Bool), title, deleted/(Bool)}]`
- (`[GET]`) `/trash`
  - 获取我删除的文档(可恢复)
  - `data: [{id, deleteTime, owned(Bool), title}]`
- (`[DELETE]`) `/delete/:docID`
  - 删除`docID`的文档
- (`[GET]`) `/restore/:docID`
  - 恢复`docID`的文档
- (`[DELETE]`) `/destroy/:docID`
  - 彻底删除`docID`的文档
