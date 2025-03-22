import { IsOptional, IsString } from 'class-validator';

export class ProductDetailsItemClass {
  @IsString()
  info: string;

  @IsOptional()
  @IsString()
  title?: string | null;
}
