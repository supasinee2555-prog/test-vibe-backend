import { Router } from "express";
import { ExpenseController } from "../controllers/ExpenseController";

export const expenseRouter = Router();
const expenseController = new ExpenseController();

expenseRouter.post("/", expenseController.create);
expenseRouter.get("/", expenseController.getAll);
expenseRouter.get("/:id", expenseController.getOne);
expenseRouter.put("/:id", expenseController.update);
expenseRouter.delete("/:id", expenseController.delete);