import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

@Entity()
@Unique(['code'])
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, nullable: false })
  code: string;

  @Column({ length: 45, nullable: false })
  name: string;

  @Column({ nullable: false })
  startDate: Date;

  @Column()
  @IsOptional()
  endDate: Date;

}
