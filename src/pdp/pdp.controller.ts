import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PdpService } from './pdp.service';

@Controller('product')
export class PdpController {
  constructor(private readonly mainService: PdpService) {}

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.mainService.getProductById(id);
  }
}
