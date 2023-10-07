import { Database } from "bun:sqlite";
import { CreateOrderDTO, OrderEntity, UpdateOrderDTO } from "../types";

export class OrderRepository {
  constructor(private readonly db: Database) {}

  async getOrders() {
    return this.db.query("SELECT * FROM order").all();
  }

  async create(order: CreateOrderDTO) {
    return this.db
      .query(`INSERT INTO order (user_id, value) VALUES (?, ?) RETURNING id`)
      .get(order.userId, order.value) as number;
  }

  async update(id: number, order: UpdateOrderDTO) {
    if (!order?.value) return;

    let query = `UPDATE deposit SET value = ${order.value} WHERE id = ${id}`;

    return this.db.run(query);
  }

  async delete(id: number) {
    return this.db.run(`DELETE FROM order WHERE id = ${id}`);
  }

  async getOrderById(id: number) {
    return this.db
      .query(`SELECT * FROM order WHERE id=${id}`)
      .get() as OrderEntity;
  }

  async getByUserId(userId: number) {
    return this.db
      .query(`SELECT * FROM order WHERE user_id = ?`)
      .get(userId) as OrderEntity;
  }
}
