import { Router } from "express";

import {
  createNewDoc,
  moveToTrash,
  restoreFromTrash,
  deleteForever,
  getRecent,
  getShared,
  getTrash,
  acceptShare,
} from "../actions/doc";

import { jwtChecker } from "../middlewares/authorization";

const router = Router();

router.use(jwtChecker);

router.get("/new", createNewDoc);

router.get("/recent", getRecent);

router.get("/shared", getShared);

router.get("/trash", getTrash);

router.get("/accept/:docID", acceptShare);

router.delete("/delete/:docID", moveToTrash);

router.get("/restore/:docID", restoreFromTrash);

router.delete("/destroy/:docID", deleteForever);

export const doc = router;
