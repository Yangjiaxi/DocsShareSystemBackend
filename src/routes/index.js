import express from "express";
import { user } from "./user";
import { doc } from "./doc";

export const app = express();

app.use("/user", user);

app.use("/doc", doc);

export const routes = app;
