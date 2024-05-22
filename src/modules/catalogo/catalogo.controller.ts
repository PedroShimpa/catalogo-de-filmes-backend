import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	UseGuards,
	Request,
	Delete
  } from "@nestjs/common"
import { CatalogoService } from './catalogo.service';
import { Public } from '../auth/public.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileDto } from '../auth/dto/profile.dto';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { Catalogo } from './entities/catalogo.entity';
import { UpdateFilmeDto } from "./dto/update-filme.dto";

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

	@Get(":id")
	findOne(@Param("id") id: string): Promise<Catalogo> {
		return this.catalogoService.findOne(id)
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateFilmeDto: UpdateFilmeDto,
	) {
		return this.catalogoService.update(id, updateFilmeDto)
	}

	@Delete(":id")
	delete(
		@Param("id") id: string,
	) {
		return this.catalogoService.remove(id)
	}
}
