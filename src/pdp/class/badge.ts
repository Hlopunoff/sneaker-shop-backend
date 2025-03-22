import { IsHexColor, IsString } from 'class-validator';

export class ProductBadgeClass {
  @IsHexColor()
  backgroundColor: string;

  @IsHexColor()
  color: string;

  @IsString()
  text: string;
}
