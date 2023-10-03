import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO } from "../types";

export class UserService {
  constructor(private readonly repository: UserRepository) { }

  public async create(data: CreateUserDTO) {
    const user = await this.repository.getByName(data.name);
    if (user) throw new Error();
    try {
      await this.repository.create(data);
      return this.repository.getByName(data.name);
    } catch {
      return { error: 'Deu ruim, bicho.' }
    }
  }
}
