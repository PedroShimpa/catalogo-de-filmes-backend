
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; 
import { AuthController } from './auth.controller';
import { CatalogController } from '../catalog/catalog.controller';
import { CatalogService } from '../catalog/catalog.service';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [
    UserModule,  
    JwtModule.register({
      secret: 'macacosmemordam', 
      signOptions: { expiresIn: '500s' },
    })
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
