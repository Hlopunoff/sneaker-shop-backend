import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserInfo(userId: number) {
    return await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
