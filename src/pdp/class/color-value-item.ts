import { IsHexColor, IsString } from 'class-validator';

export class ColorValueClass {
  @IsString()
  value: string;

  @IsHexColor()
  color: string;
}
