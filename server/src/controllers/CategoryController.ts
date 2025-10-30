import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryController {
  private categoryRepository = AppDataSource.getRepository(Category);

  create = async (req: Request, res: Response) => {
    try {
      const category = this.categoryRepository.create(req.body);
      const result = await this.categoryRepository.save(category);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error creating category" });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryRepository.find({
        relations: ["expenses"],
      });
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching categories" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryRepository.findOneBy({ id: req.params.id });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      this.categoryRepository.merge(category, req.body);
      const result = await this.categoryRepository.save(category);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error updating category" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryRepository.findOneBy({ id: req.params.id });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      await this.categoryRepository.remove(category);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Error deleting category" });
    }
  };
}