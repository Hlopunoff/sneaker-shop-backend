import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AddToCartDto, DeleteFromCartDto } from './dto';

@Injectable()
export class CartRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCart(userId: number) {
    return await this.databaseService.cart.findMany({
      where: {
        userId,
      },
      omit: {
        userId: true,
      },
    });
  }

  async addToCart(dto: AddToCartDto, userId: number) {
    const { productId, selectedConfiguration } = dto;

    return await this.databaseService.cart.upsert({
      create: {
        amount: 1,
        userId,
        productId,
        selectedColorValue: selectedConfiguration.color,
        selectedSize: selectedConfiguration.size,
      },
      update: {
        amount: {
          increment: 1,
        },
      },
      where: {
        userId_productId_selectedColorValue_selectedSize: {
          productId,
          userId,
          selectedColorValue: selectedConfiguration.color,
          selectedSize: selectedConfiguration.size,
        },
      },
    });
  }

  async removeFromCart(dto: DeleteFromCartDto, userId: number) {
    const { productId, selectedConfiguration } = dto;

    const currentCartItem = await this.databaseService.cart.findUnique({
      where: {
        userId_productId_selectedColorValue_selectedSize: {
          userId,
          productId,
          selectedSize: selectedConfiguration.size,
          selectedColorValue: selectedConfiguration.color,
        },
      },
    });

    if (!currentCartItem) {
      throw new BadRequestException('Такого товара нет в корзине');
    }

    if (currentCartItem.amount > 1) {
      return this.databaseService.cart.update({
        where: {
          userId_productId_selectedColorValue_selectedSize: {
            userId,
            productId,
            selectedColorValue: selectedConfiguration.color,
            selectedSize: selectedConfiguration.size,
          },
        },
        data: {
          amount: {
            decrement: 1,
          },
        },
      });
    }

    const lastItem = await this.databaseService.cart.delete({
      where: {
        userId_productId_selectedColorValue_selectedSize: {
          userId,
          productId,
          selectedColorValue: selectedConfiguration.color,
          selectedSize: selectedConfiguration.size,
        },
      },
    });

    return {
      ...lastItem,
      amount: 0,
    };
  }

  async deleteFromCart(dto: DeleteFromCartDto, userId: number) {
    const { productId, selectedConfiguration } = dto;

    return await this.databaseService.cart.delete({
      where: {
        userId_productId_selectedColorValue_selectedSize: {
          userId,
          productId,
          selectedColorValue: selectedConfiguration.color,
          selectedSize: selectedConfiguration.size,
        },
      },
    });
  }

  async deleteCart(userId: number) {
    return await this.databaseService.cart.deleteMany({
      where: {
        userId,
      },
    });
  }

  async getTotalCartItems(userId: number) {
    return await this.databaseService.cart.count({
      where: {
        userId,
      },
    });
  }
}
