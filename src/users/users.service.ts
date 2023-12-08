import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/inputs';
import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error creating user');
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    return {} as User;
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Email not found');
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return {} as User;
  }

  async block(id: string): Promise<User> {
    return {} as User;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
