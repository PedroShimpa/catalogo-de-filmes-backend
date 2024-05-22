import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Catalog } from './entities/catalog.entity';
import { User } from '../user/entities/user.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class CatalogService {
	constructor(
		@InjectRepository(Catalog)
		private catalogRepository: Repository<Catalog>,
	) { }

	async create(catalogData: CreateFilmDto): Promise<Catalog> {
		const existingUser = await this.catalogRepository.findOne({ where: { name: catalogData.name } });
  
		if (existingUser) {
		  throw new BadRequestException(
			'This film name already in use.',
		  );
		}
		const catalog = this.catalogRepository.create(catalogData);
		const savedCatalog = await this.catalogRepository.save(catalog);
		return savedCatalog;
	}

	findAll(): Promise<Catalog[]> {
		return this.catalogRepository.find();
	}

	findOne(id: string): Promise<Catalog> {
		return this.catalogRepository.findOne({ where: { id } });
	}

	async update(id: string, UpdateFilmDto: UpdateFilmDto): Promise<void> {
		await this.catalogRepository.update(id, UpdateFilmDto);
	}

	async remove(id: string): Promise<void> {
		await this.catalogRepository.delete(id);
	}
}
