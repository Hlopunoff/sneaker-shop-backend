import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlpService } from './plp.service';
import { FiltersDto } from './dto';

@Controller('catalog')
export class PlpController {
  constructor(private readonly plpService: PlpService) {}

  @Get(':category')
  async getListing(@Param('category') category: string) {
    return await this.plpService.getListing(category);
  }

  @Post('plp')
  async getListingByFilters(@Body() dto: FiltersDto) {
    return await this.plpService.getListingByFilters(dto);
  }

  // TODO Переписать на квери параметры
  @Post('filters')
  async getFilters(@Body() dto: { category: string }) {
    return await this.plpService.getFilters(dto.category);
  }
}
