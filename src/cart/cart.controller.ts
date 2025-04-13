import {
  Controller,
  Get,
  Req,
  UseGuards,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CartService } from './cart.service';
import { AddToCartDto, DeleteFromCartDto } from './dto';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('listing')
  async getCart(@Req() req) {
    return await this.cartService.getCart(req.userId);
  }

  @Patch('item/add')
  async addToCart(@Body() dto: AddToCartDto, @Req() req) {
    return await this.cartService.addToCart(dto, req.userId);
  }

  @Patch('item/remove')
  async removeFromCart(@Body() dto: DeleteFromCartDto, @Req() req) {
    return await this.cartService.removeFromCart(dto, req.userId);
  }

  @Delete('item/delete')
  async deleteFromCart(@Body() dto: DeleteFromCartDto, @Req() req) {
    return await this.cartService.deleteFromCart(dto, req.userId);
  }

  @Delete('listing')
  async deleteCart(@Req() req) {
    return await this.cartService.deleteCart(req.userId);
  }
}
