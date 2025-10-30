import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Expense } from "../entity/Expense";

export class ExpenseController {
  private expenseRepository = AppDataSource.getRepository(Expense);

  create = async (req: Request, res: Response) => {
    try {
      const expense = this.expenseRepository.create(req.body);
      const result = await this.expenseRepository.save(expense);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error creating expense" });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const expenses = await this.expenseRepository.find({
        relations: ["category", "user"],
      });
      return res.json(expenses);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching expenses" });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const expense = await this.expenseRepository.findOne({
        where: { id: req.params.id },
        relations: ["category", "user"],
      });
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      return res.json(expense);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching expense" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const expense = await this.expenseRepository.findOneBy({ id: req.params.id });
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      this.expenseRepository.merge(expense, req.body);
      const result = await this.expenseRepository.save(expense);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error updating expense" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const expense = await this.expenseRepository.findOneBy({ id: req.params.id });
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      await this.expenseRepository.remove(expense);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Error deleting expense" });
    }
  };
}