import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { OrderDto } from './dto';
import { PdpService } from 'src/pdp/pdp.service';
import { SelectedConfigurationClass } from 'src/cart/classes';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly pdpService: PdpService,
  ) {}

  async getOrders(userId: number) {
    const orders = await this.customerRepository.getOrders(userId);

    const ordersFormatted = await Promise.all(
      orders.map(async (order) => {
        const products = await Promise.all(
          order.orderItems.map((orderItem) =>
            this.pdpService.getProductById(orderItem.productId),
          ),
        );

        const orderItemsFormatted = order.orderItems.map((orderItem) => {
          const product = products.find((p) => p.id === orderItem.productId);

          return {
            ...product,
            amount: orderItem.amount,
            selectedConfiguration: new SelectedConfigurationClass(
              orderItem.selectedSize,
              orderItem.selectedColorValue,
            ),
          };
        });

        return {
          id: order.id,
          total: order.total,
          address: order.address,
          deliveryDate: Number(order.deliveryDate),
          items: orderItemsFormatted,
        };
      }),
    );

    return ordersFormatted;
  }

  async deleteOrder(orderId: string) {
    return await this.customerRepository.deleteOrder(orderId);
  }

  async createOrder(userId: number, dto: OrderDto) {
    return await this.customerRepository.createOrder(userId, dto);
  }
}
