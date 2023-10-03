export interface CreateUserDTO {
  name: string;
  code: string;
}

export type UpdateUserDTO = Partial<CreateUserDTO>;

export interface UserEntity {
  id: number;
  name: string;
  code: string;
}
