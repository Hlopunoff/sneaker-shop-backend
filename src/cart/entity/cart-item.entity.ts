import { IsNumber, IsObject } from 'class-validator';
import { ProductEntity } from 'src/pdp/entity';
import { SelectedConfigurationClass } from '../classes';

export class CartItemEntity {
  @IsNumber()
  amount: number;

  @IsObject()
  selectedConfiguration: SelectedConfigurationClass;

  @IsObject()
  product: ProductEntity;

  constructor(
    product: ProductEntity,
    amount: number,
    size: number,
    colorValue: string,
  ) {
    this.product = product;
    this.amount = amount;
    this.selectedConfiguration = new SelectedConfigurationClass(
      size,
      colorValue,
    );
  }
}
