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
import { CatalogService } from './catalog.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileDto } from '../auth/dto/profile.dto';
import { CreateFilmDto } from './dto/create-film.dto';
import { Catalog } from './entities/catalog.entity';
import { UpdateFilmDto } from "./dto/update-film.dto";

@Controller('catalog')
export class CatalogController {
	constructor(private catalogService: CatalogService) { }

	@UseGuards(AuthGuard)
	@Get()
	getFilmes(@Request() req: Request & { user: ProfileDto }) {
		return this.catalogService.findAll();
	}

	@UseGuards(AuthGuard)
	@Post()
	create(@Body() CreateFilmDto: CreateFilmDto): Promise<Catalog> {
		return this.catalogService.create(CreateFilmDto)
	}

	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string): Promise<Catalog> {
		return this.catalogService.findOne(id)
	}

	@UseGuards(AuthGuard)
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() UpdateFilmDto: UpdateFilmDto,
	) {
		return this.catalogService.update(id, UpdateFilmDto)
	}

	@UseGuards(AuthGuard)
	@Delete(":id")
	delete(
		@Param("id") id: string,
	) {
		return this.catalogService.remove(id)
	}
}
