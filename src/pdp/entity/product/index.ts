import {
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
  IsArray,
  IsHexColor,
  IsBoolean,
} from 'class-validator';
import {
  ApiColorValueDto,
  ApiProductDto,
  ApiProductInfoItemDto,
  ApiProductConfigurationItemDto,
  ApiProductConfigurationDto,
} from '../../dto/api';
import {
  ColorValueClass,
  ProductBadgeClass,
  ProductDetailsItemClass,
} from '../../class';

class ProductInfoItemEntity {
  @IsString()
  title: string;

  details: ProductDetailsItemClass[] | string;

  constructor(data: ApiProductInfoItemDto) {
    this.title = data.title;

    if (data.details.length === 1) {
      this.details = data.details[0].info;
    } else {
      this.details = data.details;
    }
  }
}

class ColorValueEntity extends ColorValueClass {
  @IsHexColor()
  color: string;

  @IsString()
  value: string;

  constructor(data: ApiColorValueDto) {
    super();

    this.color = data.colorValue.color;
    this.value = data.colorValue.value;
  }
}

class ProductConfigurationItemEntity {
  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsArray()
  values: ColorValueEntity[] | number[];

  constructor(data: ApiProductConfigurationItemDto) {
    this.title = data.title;
    this.type = data.type;

    if (data.type === 'color') {
      this.values = data.values.map((color) => new ColorValueEntity(color));
    } else {
      this.values = data.values.map((size) => size.sizeValue.value);
    }
  }
}

class ProductConfigurationEntity {
  @IsObject()
  colors: ProductConfigurationItemEntity;

  @IsObject()
  sizes: ProductConfigurationItemEntity;

  constructor(data: ApiProductConfigurationDto) {
    this.colors = new ProductConfigurationItemEntity(data.colors);
    this.sizes = new ProductConfigurationItemEntity(data.sizes);
  }
}

class PricesEntity {
  @IsNumber()
  current: number;

  @IsOptional()
  @IsNumber()
  old?: number | null;

  constructor(data: ApiProductDto) {
    this.current = data.currentPrice;
    this.old = data.oldPrice;
  }
}

class ActionsEntity {
  @IsBoolean()
  isPopular: boolean;

  @IsBoolean()
  isFavorite: boolean;

  constructor(data: ApiProductDto) {
    this.isFavorite = data.isFavorite;
    this.isPopular = data.isPopular;
  }
}

export class ProductEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  brand: string | null;

  @IsString()
  @IsOptional()
  category: string | null;

  @IsObject()
  actions: ActionsEntity;

  @IsObject()
  @IsOptional()
  badge?: ProductBadgeClass | null;

  @IsArray()
  images: string[];

  @IsArray()
  productInfo: ProductInfoItemEntity[];

  @IsObject()
  configuration: ProductConfigurationEntity;

  @IsObject()
  prices: PricesEntity;

  @IsOptional()
  @IsNumber()
  discount?: number | null;

  constructor(data: ApiProductDto) {
    this.id = data.id;
    this.name = data.name;
    this.badge = data.badge;
    this.brand = data.brand.name;
    this.category = data.category.name;
    this.images = data.images.map((image) => image.url);
    this.prices = new PricesEntity(data);
    this.actions = new ActionsEntity(data);
    this.discount = this.getDiscount();

    this.productInfo = data.productInfo.map(
      (item) => new ProductInfoItemEntity(item),
    );

    this.configuration = new ProductConfigurationEntity(data.configuration);
  }

  private getDiscount() {
    if (!this.prices.old) return;

    const { old, current } = this.prices;

    return +(1 - current / old).toPrecision(2) * 100;
  }
}
