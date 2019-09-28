import express from 'express';
import { user } from './user';

export const app = express();

app.use('/user', user);

export const routes = app;
