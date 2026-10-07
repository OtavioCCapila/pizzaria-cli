import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class SessionService {
  private user: User | null = null;

  create(user: User) {
    this.user = user;
  }

  remove() {
    this.user = null;
  }

  getUser(): User | null {
    if (!this.user) {
      throw new Error('No user is currently logged in.');
    }

    return this.user;
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }
}
