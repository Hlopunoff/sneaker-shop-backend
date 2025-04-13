import { Module } from '@nestjs/common';
import { PdpController } from './pdp.controller';
import { PdpService } from './pdp.service';
import { PdpRepository } from './pdp.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PdpController],
  imports: [DatabaseModule],
  providers: [PdpService, PdpRepository],
  exports: [PdpService],
})
export class PdpModule {}
