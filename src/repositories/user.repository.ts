import { Database } from 'bun:sqlite';
import { UserEntity } from '../types';

export class UserRepository {
  constructor(private readonly db: Database) { }

  async getUsers() {
    return this.db.query('SELECT * FROM users').all();
  }

  async createUser(user: UserEntity) {
    return this.db.query(`INSERT INTO users (name, code) VALUES (?, ?) RETURNING id`).get(user.name, user.code) as UserEntity;
  }

  async updateUser(id: number, user: UserEntity) {
    return this.db.run(`UPDATE users SET name = '${user.name}', code = '${user.code}' WHERE id = ${id}`);
  }

  async deleteUser(id: number) {
    return this.db.run(`DELETE FROM users WHERE id = ${id}`);
  }

  async getUser(id: number) {
    return this.db.query(`SELECT * FROM users WHERE id=${id}`).get() as UserEntity;
  }

}
