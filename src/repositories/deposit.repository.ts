import { Database } from "bun:sqlite";
import { CreateDepositDTO, DepositEntity, UpdateDepositDTO } from "../types";

export class DepositRepository {
  constructor(private readonly db: Database) {}

  async getDeposits() {
    return this.db.query("SELECT * FROM deposit").all();
  }

  async create(deposit: CreateDepositDTO) {
    return this.db
      .query(`INSERT INTO deposit (user_id, value) VALUES (?, ?) RETURNING id`)
      .get(deposit.userId, deposit.value) as number;
  }

  async update(id: number, deposit: UpdateDepositDTO) {
    if (!deposit?.userId && !deposit?.value) return;

    let query = "UPDATE deposit SET ";

    if (deposit?.userId) query += `user_id = ${deposit.userId},`;

    if (deposit?.value) query += `value = ${deposit.value},`;

    query = query.slice(0, -1);

    query += ` WHERE id = ${id}`;

    return this.db.run(query);
  }

  async delete(id: number) {
    return this.db.run(`DELETE FROM deposit WHERE id = ${id}`);
  }

  async getDepositById(id: number) {
    return this.db
      .query(`SELECT * FROM deposit WHERE id=${id}`)
      .get() as DepositEntity;
  }

  async getByUserId(userId: number) {
    return this.db
      .query(`SELECT * FROM deposit WHERE user_id = ?`)
      .get(userId) as DepositEntity;
  }
}
