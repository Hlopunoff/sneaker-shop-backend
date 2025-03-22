import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PdpModule } from './pdp/pdp.module';
import { PlpModule } from './plp/plp.module';

@Module({
  imports: [PdpModule, PlpModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
