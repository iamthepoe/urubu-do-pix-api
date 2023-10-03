import { Database } from 'bun:sqlite';
import { CreateUserDTO, UserEntity } from '../types';

export class UserRepository {
  constructor(private readonly db: Database) { }

  async getUsers() {
    return this.db.query('SELECT * FROM user').all();
  }

  async create(user: CreateUserDTO) {
    return this.db.query(`INSERT INTO user (name, code) VALUES (?, ?) RETURNING id`).get(user.name, user.code) as UserEntity;
  }

  async update(id: number, user: CreateUserDTO) {
    return this.db.run(`UPDATE user SET name = '${user.name}', code = '${user.code}' WHERE id = ${id}`);
  }

  async delete(id: number) {
    return this.db.run(`DELETE FROM user WHERE id = ${id}`);
  }

  async getUser(id: number) {
    return this.db.query(`SELECT * FROM user WHERE id=${id}`).get() as UserEntity;
  }

  async getByName(name: string) {
    return this.db.query(`SELECT * FROM user WHERE name = ?`).get(name);
  }
}
