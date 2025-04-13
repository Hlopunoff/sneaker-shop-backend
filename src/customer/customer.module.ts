import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { PdpModule } from 'src/pdp/pdp.module';

@Module({
  controllers: [CustomerController],
  imports: [DatabaseModule, PdpModule],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
