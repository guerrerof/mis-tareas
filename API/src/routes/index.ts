import { Router } from 'express';
import auth from './auth';
import user from './user';
import course from './course';
import student from './student';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/courses', course);
routes.use('/students', student);

export default routes;
