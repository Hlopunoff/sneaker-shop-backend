interface IProduct {
  name: string;
  currentPrice: number;
  oldPrice?: number;
  badgeId?: number;
  brandId: number;
  categoryId: number;
  sportId: number;
  materialId: number;
  seasonId: number;
  originId: number;
  description?: string;
  isPopular?: boolean;
  images?: string[];
}

export class ProductFactory {
  productId: number;
  data: IProduct;

  constructor(data: IProduct, index: number) {
    this.productId = index + 1;
    this.data = data;
  }

  getProductData() {
    const {
      name,
      badgeId,
      brandId,
      currentPrice,
      oldPrice,
      categoryId,
      sportId,
      materialId,
      seasonId,
      originId,
      description,
      isPopular,
    } = this.data;

    return {
      name,
      currentPrice,
      oldPrice,
      badgeId,
      brandId,
      categoryId,
      sportId,
      materialId,
      seasonId,
      originId,
      description,
      isPopular,
    };
  }

  getImages() {
    const productId = this.productId;

    return this.data.images.map((url) => ({ productId, url }));
  }

  getSizesConfig() {
    const productId = this.productId;
    const sizeValueIds = new Set<number>();
    const sizesAmount = Math.ceil(Math.random() * 10);

    while (sizeValueIds.size < sizesAmount) {
      sizeValueIds.add(Math.ceil(Math.random() * 11));
    }

    return Array.from(sizeValueIds).map((sizeValueId) => ({
      sizeId: productId,
      sizeValueId,
    }));
  }

  getColorConfig() {
    const productId = this.productId;
    const colorValueIds = new Set<number>();
    const colorsAmount = Math.ceil(Math.random() * 3);

    while (colorValueIds.size < colorsAmount) {
      colorValueIds.add(Math.ceil(Math.random() * 5));
    }

    return Array.from(colorValueIds).map((colorValueId) => ({
      colorId: productId,
      colorValueId,
    }));
  }

  getConfig() {
    const productId = this.productId;

    return {
      productId,
      colorsId: productId,
      sizesId: productId,
    };
  }
}
