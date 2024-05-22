import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { AuthModule } from '../auth/auth.module';
import { Catalog } from './entities/catalog.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [
    UserModule,  
    JwtModule.register({
      secret: 'macacosmemordam', 
      signOptions: { expiresIn: '500s' },
    }),
    TypeOrmModule.forFeature([Catalog]),
    AuthModule,  
    RedisService
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService]
})
export class CatalogModule {}
