import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignupDto } from './dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async signup(dto: SignupDto) {
    return await this.databaseService.user.create({
      data: dto,
    });
  }

  async isEmailInUse(email: string) {
    return Boolean(
      await this.databaseService.user.findUnique({
        where: {
          email,
        },
      }),
    );
  }

  async getUser(email: string) {
    return await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getRefreshToken(token: string) {
    return await this.databaseService.refreshToken.findUnique({
      where: {
        token,
        expireDate: {
          gte: new Date(),
        },
      },
    });
  }

  async storeRefreshToken(token: string, userId: number) {
    const expireDate = new Date().getTime() + 31 * 24 * 60 * 60 * 1000;

    await this.databaseService.refreshToken.upsert({
      where: {
        userId,
      },
      update: { token, expireDate: new Date(expireDate) },
      create: {
        token,
        userId,
        expireDate: new Date(expireDate),
      },
    });
  }
}
