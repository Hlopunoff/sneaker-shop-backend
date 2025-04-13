import { HttpException, Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { ProductsEntity } from './entity';
import { PdpService } from 'src/pdp/pdp.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly repository: FavoritesRepository,
    private readonly pdpService: PdpService,
  ) {}

  async addToFavorite(productId: number, userId: number) {
    try {
      await this.repository.addToFavorite(productId, userId);

      return await this.pdpService.getProductById(productId);
    } catch (error) {
      throw new HttpException(
        'Не удалось добавить товар в избранное',
        error.status,
        error,
      );
    }
  }

  async removeFromFavorite(productId: number, userId: number) {
    try {
      return await this.repository.removeFromFavorite(productId, userId);
    } catch (error) {
      throw new HttpException(
        'Не удалось удалить товар из избранного',
        error.status,
        error,
      );
    }
  }

  async getListing(userId: number) {
    const apiDto = await this.repository.getListing(userId);

    return new ProductsEntity(apiDto);
  }
}
