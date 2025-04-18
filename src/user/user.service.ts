import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUserInfo(userId: number) {
    return await this.repository.getUserInfo(userId);
  }
}
