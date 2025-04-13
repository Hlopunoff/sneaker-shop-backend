import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PRODUCT_QUERY_BASE } from 'src/queries/product';

@Injectable()
export class FavoritesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async addToFavorite(productId: number, userId: number) {
    return await this.databaseService.favorites.create({
      data: {
        productId,
        userId,
      },
    });
  }

  async removeFromFavorite(productId: number, userId: number) {
    return await this.databaseService.favorites.delete({
      where: {
        userId_productId: {
          productId,
          userId,
        },
      },
    });
  }

  async getListing(userId: number) {
    return await this.databaseService.favorites.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          ...PRODUCT_QUERY_BASE,
        },
      },
      omit: {
        productId: true,
        userId: true,
      },
    });
  }
}
