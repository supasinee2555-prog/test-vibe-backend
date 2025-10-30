import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

export const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post("/", categoryController.create);
categoryRouter.get("/", categoryController.getAll);
categoryRouter.put("/:id", categoryController.update);
categoryRouter.delete("/:id", categoryController.delete);