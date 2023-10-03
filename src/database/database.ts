import { Database } from 'bun:sqlite';

export class DatabaseClient {
  private db: Database;

  constructor(dbInstance: Database) {
    this.db = dbInstance;
    this.init()
      .then(() => console.log('Database initialized'))
      .catch(console.error);
  }

  async init() {
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(45) UNIQUE,
        code VARCHAR(255)
      )
    `);

    await this.db.run(`
      CREATE TABLE IF NOT EXISTS deposit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INT,
        value FLOAT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user(id)
      )
    `);

    await this.db.run(`
      CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_deposit INT,
        profit FLOAT,
        FOREIGN KEY (id_deposit) REFERENCES deposit(id)
      )
    `);

    await this.db.run(`
      CREATE TABLE IF NOT EXISTS withdraw (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_income INT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_income) REFERENCES income(id)
      )
    `);
  }
}
