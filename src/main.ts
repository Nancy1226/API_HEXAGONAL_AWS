import dotenv from 'dotenv';
dotenv.config();

import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";
import { userRouter } from './user/infrastructure/routers/user-router';
import { profileRouter } from "./profile/infrastructure/routes/profile-router";

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/users", userRouter);
  app.use("/profile", profileRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
