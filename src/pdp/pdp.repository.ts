import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PRODUCT_QUERY_BASE } from 'src/queries/product';

@Injectable()
export class PdpRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getProductById(id: number) {
    return await this.databaseService.product.findUnique({
      where: {
        id,
      },
      ...PRODUCT_QUERY_BASE,
    });
  }
}
