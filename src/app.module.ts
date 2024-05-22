// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { DatabaseOptions, RedisOptions } from './configs/app-options-constants';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabaseOptions),
    CacheModule.registerAsync(RedisOptions),
    AuthModule,
    UserModule,
    CatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
