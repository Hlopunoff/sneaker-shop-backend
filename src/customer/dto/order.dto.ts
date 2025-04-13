import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
import { SelectedConfigurationClass } from 'src/cart/classes';

class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;

  @IsObject()
  selectedConfiguration: SelectedConfigurationClass;
}

export class OrderDto {
  @IsArray()
  items: OrderItemDto[];

  @IsString()
  address: string;

  @IsString()
  deliveryDate: string;
}
