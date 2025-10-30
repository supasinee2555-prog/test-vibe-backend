import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  create = async (req: Request, res: Response) => {
    try {
      const user = this.userRepository.create(req.body);
      const result = await this.userRepository.save(user);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error creating user" });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const user = await this.userRepository.findOne({
        where: { id: req.params.id },
        relations: ["expenses"],
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const user = await this.userRepository.findOneBy({ id: req.params.id });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      this.userRepository.merge(user, req.body);
      const result = await this.userRepository.save(user);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error updating user" });
    }
  };
}