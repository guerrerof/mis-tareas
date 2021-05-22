import { Router } from 'express';
import auth from './auth';
import user from './user';
import course from './course';
import student from './student';
import studentsTeacher from './studentsTeacher';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/courses', course);
routes.use('/students', student);
routes.use('/students-teacher', studentsTeacher);

export default routes;
