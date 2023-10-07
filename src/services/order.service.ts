import { OrderRepository } from "../repositories/order.repository";
import { Money } from "../types";

export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  public async createOrder(userId: number) {
    try {
      const orderId = await this.repository.create({ userId, value: 200 });
      return this.repository.getOrderById(orderId);
    } catch {
      return { error: "Internal error." };
    }
  }

  public async updateOrder(userId: number, value: Money) {
    try {
      const orderExists = this.repository.getByUserId(userId);
      if (!orderExists) return { error: "Order not found." };
      await this.repository.update(userId, { value });
      return this.getBalance(userId);
    } catch {
      return { error: "Internal Error." };
    }
  }

  public async getBalance(userId: number) {
    try {
      const order = await this.repository.getByUserId(userId);
      if (!order) return { error: "Order not found." };

      return order.value;
    } catch {
      return { error: "Internal error." };
    }
  }
}
