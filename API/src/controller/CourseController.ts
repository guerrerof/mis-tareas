import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Course } from '../entity/Course';
import { validate } from 'class-validator';

export class CourseController {



  // **************************   SELECT ALL    **************************
  static getAll = async (req: Request, res: Response) => {
    const courseRepository = getRepository(Course);
    let course;
    try {
      const date: Date = new Date();
      console.log(date);
      course = await courseRepository.find({ select: ['id', 'code', 'name', 'startDate', 'endDate'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (course.length > 0) {
      res.send(course);
    } else {
      res.status(404).json({ message: 'Not result' });
    }

  };




  // **************************   SELECT BY ID    **************************
  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const courseRepository = getRepository(Course);
    try {
      const course = await courseRepository.findOneOrFail(id);
      res.send(course);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };





  // **************************   INSERT    **************************
  static new = async (req: Request, res: Response) => {
    const { code, name, startDate, endDate } = req.body;
    const course = new Course();
    course.code = code;
    course.name = name;
    course.startDate = startDate;
    course.endDate = endDate;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(course, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const courseRepository = getRepository(Course);
    try {
      await courseRepository.save(course);
    } catch (e) {
      return res.status(409).json({ message: 'Course already exist' });
    }
    // All ok
    res.status(201).json({ message: 'Course created' });
  };




  // **************************   UPDATE    **************************
  static edit = async (req: Request, res: Response) => {
    let course;
    const { id } = req.params;
    const { code, name, startDate, endDate } = req.body;

    const courseRepository = getRepository(Course);
    // Try get course
    try {
      course = await courseRepository.findOneOrFail(id);
      course.code = code;
      course.name = name;
      course.startDate = startDate;
      course.endDate = endDate;
    } catch (e) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(course, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save course
    try {
      await courseRepository.save(course);
    } catch (e) {
      return res.status(409).json({ message: 'Course already in use' });
    }

    res.status(201).json({ message: 'Course update' });
  };





  // **************************   DELETE    **************************
  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const courseRepository = getRepository(Course);
    let course: Course;

    try {
      await courseRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Remove course
    courseRepository.delete(id);
    res.status(201).json({ message: ' Course deleted' });
  };


}

export default CourseController;
