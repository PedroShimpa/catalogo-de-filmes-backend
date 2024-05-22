import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Catalogo } from './entities/catalogo.entity';
import { User } from '../user/entities/user.entity';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class CatalogoService {
	constructor(
		@InjectRepository(Catalogo)
		private catalogoRepository: Repository<Catalogo>,
	) { }

	async create(catalogoData: CreateFilmeDto): Promise<Catalogo> {
		catalogoData.createdAt = new Date();
		catalogoData.updatedAt = new Date();
		const catalogo = this.catalogoRepository.create(catalogoData);
		const savedCatalogo = await this.catalogoRepository.save(catalogo);
		return savedCatalogo;
	}

	findAll(): Promise<Catalogo[]> {
		return this.catalogoRepository.find();
	}

	findOne(id: string): Promise<Catalogo> {
		return this.catalogoRepository.findOne({ where: { id } });
	}

	async update(id: string, updateFilmeDto: UpdateFilmeDto): Promise<void> {
		await this.catalogoRepository.update(id, updateFilmeDto);
	}

	async remove(id: string): Promise<void> {
		await this.catalogoRepository.delete(id);
	}
}
