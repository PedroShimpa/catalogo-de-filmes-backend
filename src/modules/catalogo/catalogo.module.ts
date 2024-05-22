import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoService } from './catalogo.service';
import { CatalogoController } from './catalogo.controller';
import { AuthModule } from '../auth/auth.module';
import { Catalogo } from './entities/catalogo.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,  
    JwtModule.register({
      secret: 'macacosmemordam', 
      signOptions: { expiresIn: '500s' },
    }),
    TypeOrmModule.forFeature([Catalogo]),
    AuthModule,  
  ],
  controllers: [CatalogoController],
  providers: [CatalogoService],
  exports: [CatalogoService]
})
export class CatalogoModule {}
