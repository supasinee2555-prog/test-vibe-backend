import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Expense } from "./entity/Expense";
import { Category } from "./entity/Category";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_PATH || "./data/database.sqlite",
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [User, Expense, Category],
  migrations: [],
  subscribers: [],
});