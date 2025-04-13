import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getUserInfo(@Req() req) {
    return await this.userService.getUserInfo(req.userId);
  }
}
