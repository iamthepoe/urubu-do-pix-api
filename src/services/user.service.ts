import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO } from "../types";
import { OrderService } from "./order.service";

export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly orderService: OrderService
  ) {}

  public async create(data: CreateUserDTO) {
    const user = await this.repository.getByName(data.name);
    if (user) return { error: "User already exists." };
    try {
      const id = await this.repository.create(data);
      await this.orderService.createOrder(id);
      return this.repository.getByName(data.name);
    } catch {
      return { error: "Internal Error" };
    }
  }

  public async authenticate(data: CreateUserDTO) {
    const user = await this.repository.getByName(data.name);
    if (!user) return false;
    try {
      return data.code === user.code;
    } catch {
      return false;
    }
  }
}
