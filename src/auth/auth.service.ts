import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SigninInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.userService.create(signupInput);
    const token = 'token';
    return { user, token };
  }

  async signin(signinInput: SigninInput): Promise<AuthResponse> {
    const { email, password } = signinInput;

    const user = await this.userService.findOneByEmail(email);
    const token = 'token';

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      token,
      user,
    };
  }
}
