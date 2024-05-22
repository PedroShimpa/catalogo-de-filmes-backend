import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Unique(['name'])
export class Catalog {
  @PrimaryGeneratedColumn()
  id?: string

  @Column({ unique: true })
  name: string

  @Column({ default: null })
  description: string

  @Column({ default: null })
  releaseData: Date;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}

