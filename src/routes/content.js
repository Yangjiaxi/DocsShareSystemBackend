import { Router } from "express";

import { getComment, checkoutDocInfo } from "../actions/content";

import { jwtChecker } from "../middlewares/authorization";

const router = Router();

router.use(jwtChecker);

router.get("/checkout/:docID", checkoutDocInfo);

router.get("/comment/:commentID", getComment);

export const content = router;
