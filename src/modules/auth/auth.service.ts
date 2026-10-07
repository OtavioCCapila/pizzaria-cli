import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
  ) {}

  async register(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const existingUser = await this.userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new Error('Email em uso');
    }

    const passwordHash = await bcrypt.hash(normalizedPassword, this.saltRounds);
    return this.userRepository.create(name, normalizedEmail, passwordHash);
  }

  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const user = await this.userRepository.findByEmail(normalizedEmail);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      normalizedPassword,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    this.sessionService.create(user);
    return user;
  }
}
