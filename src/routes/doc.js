import { Router } from "express";

import {
  createNewDoc,
  moveToTrash,
  restoreFromTrash,
  deleteForever,
  getRecent,
  getMine,
  getShared,
  getTrash,
  checkoutDocInfo,
  acceptShare,
} from "../actions/doc";

import { jwtChecker } from "../middlewares/authorization";

const router = Router();

router.use(jwtChecker);

router.get("/new", createNewDoc);

router.get("/recent", getRecent);

router.get("/my", getMine);

router.get("/shared", getShared);

router.get("/trash", getTrash);

router.get("/accept/:docID", acceptShare);

router.delete("/delete/:docID", moveToTrash);

router.get("/restore/:docID", restoreFromTrash);

router.delete("/destroy/:docID", deleteForever);

router.get("/checkout/:docID", checkoutDocInfo);

export const doc = router;
