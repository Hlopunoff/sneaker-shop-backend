import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FiltersDto {
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  brand?: string | null;

  @IsOptional()
  @IsString()
  color?: string | null;

  @IsOptional()
  @IsNumber()
  size?: number | null;
}
