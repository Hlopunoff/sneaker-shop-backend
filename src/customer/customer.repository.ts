import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { OrderDto } from './dto';
import { PdpService } from 'src/pdp/pdp.service';

@Injectable()
export class CustomerRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly pdpService: PdpService,
  ) {}

  async getOrders(userId: number) {
    return await this.databaseService.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      omit: {
        userId: true,
      },
    });
  }

  async deleteOrder(orderId: string) {
    return await this.databaseService.order.delete({
      where: {
        id: orderId,
      },
      omit: {
        userId: true,
      },
    });
  }

  async createOrder(userId: number, dto: OrderDto) {
    const products = await Promise.all(
      dto.items.map((item) => this.pdpService.getProductById(item.productId)),
    );

    let orderTotal = 0;

    const orderItems = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new HttpException(
          'Не удалось найти продукт при создании заказа',
          HttpStatus.NOT_FOUND,
        );
      }

      orderTotal += product.prices.current * item.amount;

      return {
        amount: item.amount,
        selectedSize: item.selectedConfiguration.size,
        selectedColorValue: item.selectedConfiguration.color,
        productId: product.id,
      };
    });

    return await this.databaseService.order.create({
      data: {
        total: orderTotal,
        userId,
        address: dto.address,
        deliveryDate: dto.deliveryDate,
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: true,
      },
      omit: {
        userId: true,
      },
    });
  }
}
