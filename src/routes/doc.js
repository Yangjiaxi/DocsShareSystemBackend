import { Router } from "express";

import { createNewDoc, moveToTrash, deleteForever } from "../actions/doc";

const router = Router();

router.get("/new", createNewDoc);

router.delete("/delete/:docID", moveToTrash);

router.delete("/deleteF/:docID", deleteForever);

export const doc = router;
