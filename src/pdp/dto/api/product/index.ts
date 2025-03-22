import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ProductBadgeClass,
  ProductDetailsItemClass,
  ColorValueClass,
} from '../../../class';

class ApiBrandDto {
  @IsString()
  name: string;
}

class ApiCategoryDto {
  @IsString()
  name: string;
}

class ApiImageDto {
  @IsString()
  url: string;
}

class ApiProductDetailsItemDto extends ProductDetailsItemClass {}

export class ApiProductInfoItemDto {
  @IsString()
  title: string;

  @IsArray()
  details: ApiProductDetailsItemDto[];
}

export class ApiColorValueDto {
  @IsObject()
  colorValue: ColorValueClass;
}

export class ApiSizeValueDto {
  @IsObject()
  sizeValue: object;
}

export class ApiProductConfigurationItemDto {
  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsArray()
  values: ApiColorValueDto[] | ApiSizeValueDto[];
}

export class ApiProductConfigurationDto {
  @IsObject()
  colors: ApiProductConfigurationItemDto;

  @IsObject()
  sizes: ApiProductConfigurationItemDto;
}

export class ApiProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  currentPrice: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number | null;

  @IsBoolean()
  isPopular: boolean;

  @IsBoolean()
  isFavorite: boolean;

  @IsObject()
  brand: ApiBrandDto;

  @IsObject()
  category: ApiCategoryDto;

  @IsObject()
  @IsOptional()
  badge?: ProductBadgeClass | null;

  @IsArray()
  images: ApiImageDto[];

  @IsArray()
  productInfo: ApiProductInfoItemDto[];

  @IsObject()
  configuration: ApiProductConfigurationDto;
}
