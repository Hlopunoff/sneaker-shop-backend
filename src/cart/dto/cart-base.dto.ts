import { IsNumber, IsObject } from 'class-validator';
import { SelectedConfigurationClass } from '../classes';

export class CartBaseDto {
  @IsNumber()
  productId: number;

  @IsObject()
  selectedConfiguration: SelectedConfigurationClass;
}
