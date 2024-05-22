import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['nome'])
export class Catalogo {
  @PrimaryGeneratedColumn()
  id?: string

  @Column()
  nome: string

  @Column()
  descricao: string


  @Column()
  createdAt?: Date

  @Column()
  updatedAt?: Date
}

