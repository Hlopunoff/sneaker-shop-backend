import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Req,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { OrderDto } from './dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('orders')
  async getOrders(@Req() req) {
    return await this.customerService.getOrders(req.userId);
  }

  @Delete('order')
  async deleteOrder(@Query('orderId') orderId: string) {
    return await this.customerService.deleteOrder(orderId);
  }

  @Post('order')
  async createOrder(@Req() req, @Body() dto: OrderDto) {
    return await this.customerService.createOrder(req.userId, dto);
  }
}
