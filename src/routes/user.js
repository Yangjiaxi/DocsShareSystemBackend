import { Router } from "express";

import {
  userRegister,
  userComfirmEmail,
  userLogin,
  getUserInfo,
  modifyUserInfo,
} from "../actions/user";

const router = Router();

router.post("/register", userRegister);

router.get("/confirm", userComfirmEmail);

router.post("/login", userLogin);

router.get("/info", getUserInfo);

router.patch("/info", modifyUserInfo);

export const user = router;
