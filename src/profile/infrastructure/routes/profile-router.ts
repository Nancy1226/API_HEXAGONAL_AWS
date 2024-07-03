// infrastructure/publication-router.ts
import express from "express";
import { profileController } from "../dependencies-profile";
import { upload } from "../adapters/storages/local-file-storage";

const profileRouter = express.Router();

profileRouter.get("/getAll", profileController.getAll.bind(profileController));
profileRouter.post("/create", upload.single('image'), profileController.create.bind(profileController));
profileRouter.get("/:id", profileController.getById.bind(profileController));
profileRouter.put('/:id', upload.single('image'), profileController.update.bind(profileController));
profileRouter.delete('/:id', profileController.delete.bind(profileController));

export { profileRouter };
