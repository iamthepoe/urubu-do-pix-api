import Database from "bun:sqlite";
import { DatabaseClient } from "../database/database";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { DepositRepository } from "../repositories/deposit.repository";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.service";

const db = new Database("urubu.db");

export const createDatabaseClient = () => {
  return new DatabaseClient(db);
};

export const createUserRepository = () => {
  return new UserRepository(db);
};

export const createUserService = () => {
  return new UserService(createUserRepository(), createOrderService());
};

export const createDepositRepository = () => {
  return new DepositRepository(db);
};

export const createOrderRepository = () => {
  return new OrderRepository(db);
};

export const createOrderService = () => {
  return new OrderService(createOrderRepository());
};
