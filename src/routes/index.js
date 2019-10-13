import express from "express";
import { user } from "./user";
import { doc } from "./doc";
import { content } from "./content";

export const app = express();

app.use("/user", user);

app.use("/doc", doc);

app.use("/content", content);

export const routes = app;
