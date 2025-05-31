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

export class ApiBrandDto {
  @IsString()
  name: string;
}

export class ApiSportDto {
  @IsOptional()
  @IsString()
  name?: string | null;
}

export class ApiMaterialDto {
  @IsOptional()
  @IsString()
  name?: string | null;
}

class ApiSeasonDto {
  @IsOptional()
  @IsString()
  name?: string | null;
}

export class ApiOriginDto {
  @IsOptional()
  @IsString()
  name?: string | null;
}

export class ApiCategoryDto {
  @IsString()
  name: string;
}

export class ApiImageDto {
  @IsString()
  url: string;
}

export class ApiProductDetailsItemDto extends ProductDetailsItemClass {}

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
  @IsOptional()
  @IsString()
  title?: string | null;

  @IsOptional()
  @IsString()
  type?: string | null;

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
  @IsString()
  description?: string | null;

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

  @IsObject()
  configuration: ApiProductConfigurationDto;

  @IsOptional()
  @IsObject()
  sport?: ApiSportDto | null;

  @IsOptional()
  @IsObject()
  season?: ApiSeasonDto | null;

  @IsOptional()
  @IsObject()
  material?: ApiMaterialDto | null;

  @IsOptional()
  @IsObject()
  origin?: ApiOriginDto | null;
}
