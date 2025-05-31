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
  ApiProductConfigurationItemDto,
  ApiProductConfigurationDto,
  ApiSportDto,
  ApiMaterialDto,
  ApiOriginDto,
} from '../../dto/api';
import {
  ColorValueClass,
  ProductBadgeClass,
  ProductDetailsItemClass,
} from '../../class';

type ProductInfoTitleType = 'О товаре' | 'Описание';

class ProductInfoItemEntity {
  @IsString()
  title: string;

  details: ProductDetailsItemClass[] | string;

  constructor(
    title: ProductInfoTitleType,
    description: string,
    sport: ApiSportDto,
    material: ApiMaterialDto,
    season: ApiSportDto,
    origin: ApiOriginDto,
  ) {
    this.title = title;

    if (title === 'Описание') {
      this.details = description;
    } else {
      this.details = [];

      if (sport?.name) {
        this.details.push({ title: 'Вид спорта', info: sport.name });
      }
      if (material?.name) {
        this.details.push({ title: 'Материал', info: material.name });
      }
      if (season?.name) {
        this.details.push({ title: 'Сезон', info: season.name });
      }
      if (origin?.name) {
        this.details.push({ title: 'Страна производства', info: origin.name });
      }
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

    this.productInfo = ['О товаре', 'Описание'].map(
      (title: ProductInfoTitleType) =>
        new ProductInfoItemEntity(
          title,
          data.description,
          data.sport,
          data.material,
          data.season,
          data.origin,
        ),
    );

    this.configuration = new ProductConfigurationEntity(data.configuration);
  }

  private getDiscount() {
    if (!this.prices.old) return;

    const { old, current } = this.prices;

    return +(1 - current / old).toPrecision(2) * 100;
  }
}
