import {
  Controller,
  Body,
  Post,
  Req,
  UseGuards,
  Delete,
  Get,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoriteDto } from './dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('add')
  async addToFavorite(@Body() dto: FavoriteDto, @Req() req) {
    return await this.favoritesService.addToFavorite(dto.productId, req.userId);
  }

  @Delete('delete')
  async removeFromFavorite(@Body() dto: FavoriteDto, @Req() req) {
    return await this.favoritesService.removeFromFavorite(
      dto.productId,
      req.userId,
    );
  }

  @Get('listing')
  async getListing(@Req() req) {
    return await this.favoritesService.getListing(req.userId);
  }
}
