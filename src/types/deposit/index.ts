import { UserEntity } from "../user";

export type Money = number;

export interface CreateDepositDTO {
  userId: UserEntity["id"];
  value: Money;
}

export type UpdateDepositDTO = Partial<CreateDepositDTO>;

export interface DepositEntity {
  id: number;
  userId: UserEntity["id"];
  value: Money;
  date: Date;
}
