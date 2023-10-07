import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO } from "../types";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async create(data: CreateUserDTO) {
    const user = await this.repository.getByName(data.name);
    if (user) return { error: "User already exists." };
    try {
      await this.repository.create(data);
      return this.repository.getByName(data.name);
    } catch {
      return { error: "Internal Error" };
    }
  }

  public async authenticate(data: CreateUserDTO) {
    const user = await this.repository.getByName(data.name);
    if (!user) return false;
    try {
      console.log(data.code, user.code);
      return data.code === user.code;
    } catch {
      return false;
    }
  }
}
