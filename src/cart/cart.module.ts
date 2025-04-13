import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { DatabaseModule } from 'src/database/database.module';
import { PdpModule } from 'src/pdp/pdp.module';

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository],
  imports: [DatabaseModule, PdpModule],
})
export class CartModule {}
