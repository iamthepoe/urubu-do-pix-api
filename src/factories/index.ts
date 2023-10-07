import Database from "bun:sqlite";
import { DatabaseClient } from "../database/database";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { DepositRepository } from "../repositories/deposit.repository";

const db = new Database("urubu.db");

export const createDatabaseClient = () => {
  return new DatabaseClient(db);
};

export const createUserRepository = () => {
  return new UserRepository(db);
};

export const createUserService = () => {
  return new UserService(createUserRepository());
};

export const createDepositRepository = () => {
  return new DepositRepository(db);
};
