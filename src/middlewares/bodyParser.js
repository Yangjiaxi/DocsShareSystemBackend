import { json, urlencoded } from "express";

export const jsonParser = json({ limit: "1mb" });
export const urlencodedParser = urlencoded({ extended: true });
