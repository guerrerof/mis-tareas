import { Course } from './Course';
import { Users } from './Users';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class StudentCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, users => users.id)
  student: Users;

  @ManyToOne(() => Course, course => course.id)
  course: Course;

}
