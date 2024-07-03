import express from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

// ruta: /id/operacion que se esta ejecutando
userRouter.get("/getAll", userController.getAll.bind(userController)); // Cuando se ejecute este caso de uso queremos que se ejecute el metodo run(que envia email) del userController

userRouter.post("/create", userController.create.bind(userController)); 
userRouter.get("/:id", userController.getById.bind(userController))
userRouter.put('/:id', userController.update.bind(userController));
userRouter.delete('/:id', userController.delete.bind(userController));

export { userRouter }; // Exporta para crear nueva ruta en el main.ts
