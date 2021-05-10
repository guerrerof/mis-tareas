import { Users } from './Users';
import { Course } from './Course';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Activity } from './Activity';

@Entity()
export class ActivityStudents {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activity, activity => activity.id)
  activity: Activity;

  @ManyToOne(() => Users, users => users.id)
  student: Users;

}
