import { Injectable } from '@nestjs/common';
import { PlpRepository } from './plp.repository';
import { FiltersEntity, ProductsEntity } from './entity';
import { FiltersDto } from './dto';

@Injectable()
export class PlpService {
  constructor(private readonly repository: PlpRepository) {}

  async getListing(category: string) {
    const apiDto = await this.repository.getListing(category);

    return new ProductsEntity(apiDto);
  }

  async getListingByFilters(dto: FiltersDto) {
    const apiDto = await this.repository.getListingByFilters(dto);

    return new ProductsEntity(apiDto);
  }

  async getFilters(category: string) {
    const apiDto = await this.repository.getFilters(category);

    return new FiltersEntity(apiDto);
  }
}
