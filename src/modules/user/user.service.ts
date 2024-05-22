import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'src/util/encrypt.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
  
    if (existingUser) {
      throw new BadRequestException(
        'Account with this email already exists.',
      );
    }
    
    createUserDto.password = await hash(createUserDto.password);
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);

    savedUser.password = undefined;
    return savedUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneWithPasswordByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
