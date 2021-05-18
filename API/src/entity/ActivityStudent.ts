import { Student } from './Student';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Activity } from './Activity';

@Entity()
export class ActivityStudents {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activity, activity => activity.id)
  activity: Activity;

  @ManyToOne(() => Student, student => student.id)
  student: Student;

}
