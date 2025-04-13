import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { PdpModule } from './pdp/pdp.module';
import { PlpModule } from './plp/plp.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { UserModule } from './user/user.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    PdpModule,
    PlpModule,
    AuthModule,
    UserModule,
    FavoritesModule,
    CartModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
