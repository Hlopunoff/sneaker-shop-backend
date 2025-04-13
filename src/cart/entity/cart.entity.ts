import { IsArray, IsNumber } from 'class-validator';
import { CartItemEntity } from './cart-item.entity';

export class CartEntity {
  @IsArray()
  cart: object[];

  @IsNumber()
  totalItems: number;

  constructor(cartItems: CartItemEntity[], totalItems: number) {
    this.totalItems = totalItems;
    this.cart = cartItems.map((item) => ({
      ...item.product,
      selectedConfiguration: item.selectedConfiguration,
      amount: item.amount,
    }));
  }
}
