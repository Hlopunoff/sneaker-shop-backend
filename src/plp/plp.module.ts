import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PlpRepository } from './plp.repository';
import { PlpService } from './plp.service';
import { PlpController } from './plp.controller';

@Module({
  controllers: [PlpController],
  providers: [PlpRepository, PlpService],
  imports: [DatabaseModule],
})
export class PlpModule {}
