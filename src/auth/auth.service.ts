import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto, LoginDto } from './dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const { email, password } = dto;

    const isEmailInUse = await this.repository.isEmailInUse(email);

    if (isEmailInUse) {
      throw new BadRequestException('Пользователь с таким email уже есть');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return await this.repository.signup({
      email,
      password: hashedPassword,
    });
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.repository.getUser(email);

    if (!user?.email) {
      throw new UnauthorizedException('Неверные данные');
    }

    const isPasswordMatches = await bcrypt.compare(password, user.password);

    if (!isPasswordMatches) {
      throw new UnauthorizedException('Неверные данные');
    }

    return this.generateTokens(user.id);
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.repository.getRefreshToken(refreshToken);

    if (!token) {
      throw new UnauthorizedException('Refresh token невалидный');
    }

    return await this.generateTokens(token.userId);
  }

  private async generateTokens(userId: number) {
    const accessToken = this.jwtService.sign(
      { id: userId },
      { expiresIn: '30d' },
    );
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async storeRefreshToken(token: string, userId: number) {
    await this.repository.storeRefreshToken(token, userId);
  }
}
