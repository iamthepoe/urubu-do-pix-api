import { Money } from "../deposit";
import { UserEntity } from "../user";

export interface OrderEntity {
  id: number;
  userId: UserEntity["id"];
  value: Money;
}

export interface CreateOrderDTO {
  userId: UserEntity["id"];
  value: Money;
}

export interface UpdateOrderDTO {
  value?: Money;
}
