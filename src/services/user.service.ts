import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO } from "../types";

export class UserService {
  constructor(private readonly repository: UserRepository) { }

  public async create(data: CreateUserDTO) {
    const user = await this.repository.getByName(data.name);
    if (user) throw new Error();

    return this.repository.create(data);
  }
}
