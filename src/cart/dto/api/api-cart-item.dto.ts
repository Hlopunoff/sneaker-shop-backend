import { IsHexColor, IsNumber, IsString } from 'class-validator';

export class ApiCartItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  selectedSize: number;

  @IsString()
  selectedColorName: string;

  @IsHexColor()
  selectedColorValue: string;
}
