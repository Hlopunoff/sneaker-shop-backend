import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';
import { DatabaseModule } from 'src/database/database.module';
import { PdpModule } from 'src/pdp/pdp.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  imports: [DatabaseModule, PdpModule],
})
export class FavoritesModule {}
