import { Injectable } from '@nestjs/common';
import { PdpRepository } from './pdp.repository';
import { ProductEntity } from './entity/product';

@Injectable()
export class PdpService {
  constructor(private readonly repository: PdpRepository) {}

  async getProductById(id: number) {
    const apiProductDto = await this.repository.getProductById(id);

    return new ProductEntity(apiProductDto);
  }
}
