import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput): Promise<User> {
    return {} as User;
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    return {} as User;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return {} as User;
  }

  async block(id: string): Promise<User> {
    return {} as User;
  }
}
