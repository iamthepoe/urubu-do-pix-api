import { Database } from "bun:sqlite";
import { CreateUserDTO, UserEntity, UpdateUserDTO } from "../types";

export class UserRepository {
  constructor(private readonly db: Database) {}

  async getUsers() {
    return this.db.query("SELECT * FROM user").all();
  }

  async create(user: CreateUserDTO) {
    return this.db
      .query(`INSERT INTO user (name, code) VALUES (?, ?) RETURNING id`)
      .get(user.name, user.code) as number;
  }

  async update(id: number, user: UpdateUserDTO) {
    if (!user?.name && !user?.code) return;

    let query = "UPDATE user SET ";

    if (user?.name) query += `name = ${user.name},`;

    if (user?.code) query += `code = ${user.code},`;

    query = query.slice(0, -1);

    query += ` WHERE id = ${id}`;

    return this.db.run(query);
  }

  async delete(id: number) {
    return this.db.run(`DELETE FROM user WHERE id = ${id}`);
  }

  async getUser(id: number) {
    return this.db
      .query(`SELECT * FROM user WHERE id=${id}`)
      .get() as UserEntity;
  }

  async getByName(name: string) {
    return this.db
      .query(`SELECT * FROM user WHERE name = ?`)
      .get(name) as UserEntity;
  }
}
