import { BadRequestException, Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { PdpService } from 'src/pdp/pdp.service';
import { CartItemEntity, CartEntity } from './entity';
import { AddToCartDto, DeleteFromCartDto } from './dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly pdpService: PdpService,
  ) {}

  async getCart(userId: number) {
    const apiCartDto = await this.cartRepository.getCart(userId);

    const products = await Promise.all(
      apiCartDto.map(({ productId }) =>
        this.pdpService.getProductById(productId),
      ),
    );

    const totalItemsAmount =
      await this.cartRepository.getTotalCartItems(userId);

    const cartItems = apiCartDto.map(
      (item, index) =>
        new CartItemEntity(
          products[index],
          item.amount,
          item.selectedSize,
          item.selectedColorValue,
        ),
    );

    return new CartEntity(cartItems, totalItemsAmount);
  }

  async addToCart(dto: AddToCartDto, userId: number) {
    try {
      const { productId, amount, selectedColorValue, selectedSize } =
        await this.cartRepository.addToCart(dto, userId);

      const product = await this.pdpService.getProductById(productId);

      const entity = new CartItemEntity(
        product,
        amount,
        selectedSize,
        selectedColorValue,
      );

      return {
        ...entity.product,
        selectedConfiguration: entity.selectedConfiguration,
        amount: entity.amount,
      };
    } catch (error) {
      // TODO Сделать обработку бековых ошибок на фронте
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(
          'Вы выбрали неверную конфигурацию товара',
        );
      }

      throw error;
    }
  }

  async removeFromCart(dto: DeleteFromCartDto, userId: number) {
    return await this.cartRepository.removeFromCart(dto, userId);
  }

  async deleteFromCart(dto: DeleteFromCartDto, userId: number) {
    return await this.cartRepository.deleteFromCart(dto, userId);
  }

  async deleteCart(userId: number) {
    return await this.cartRepository.deleteCart(userId);
  }
}
