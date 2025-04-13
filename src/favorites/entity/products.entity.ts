import { ApiProductDto } from 'src/pdp/dto/api';
import { ProductsEntity as ProductsMainEntity } from 'src/plp/entity';

export class ProductsEntity extends ProductsMainEntity {
  constructor(data: { product: ApiProductDto }[]) {
    const dataInternal = data.map((item) => item.product);
    super(dataInternal);
  }
}
