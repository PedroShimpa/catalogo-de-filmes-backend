import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { Public } from '../auth/public.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileDto } from '../auth/dto/profile.dto';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { Catalogo } from './entities/catalogo.entity';

@Controller('catalogo')
export class CatalogoController {
	constructor(private catalogoService: CatalogoService) { }
	// @HttpCode(HttpStatus.OK)
	// @Public()
	// @Post("login")
	// signIn(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
	//   return this.authService.signIn(loginDto)
	// }

	@UseGuards(AuthGuard)
	@Get()
	getFilmes(@Request() req: Request & { user: ProfileDto }) {
		return this.catalogoService.findAll();
	}

	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createFilmeDto: CreateFilmeDto): Promise<Catalogo> {
		return this.catalogoService.create(createFilmeDto)
	}
}
