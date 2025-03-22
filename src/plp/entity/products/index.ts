import { ApiProductDto } from 'src/pdp/dto/api';
import { ProductEntity } from 'src/pdp/entity/product';

export class ProductsEntity {
  products: ProductEntity[];

  constructor(data: ApiProductDto[]) {
    this.products = data.map((product) => new ProductEntity(product));
  }
}
