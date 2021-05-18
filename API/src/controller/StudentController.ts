import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Student } from '../entity/Student';
import { validate } from 'class-validator';

export class StudentController {



  // **************************   SELECT ALL    **************************
  static getAll = async (req: Request, res: Response) => {
    const studentRepository = getRepository(Student);
    let student;
    try {
      student = await studentRepository.find();

      if (student.length > 0) {
        res.send(student);
      } else {
        res.status(404).json({ message: 'Not result' });
      }

    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }
  };




  // **************************   SELECT BY ID    **************************
  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const studentRepository = getRepository(Student);
    try {
      const student = await studentRepository.findOneOrFail(id);
      res.send(student);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };





  // **************************   INSERT    **************************
  static new = async (req: Request, res: Response) => {
    const { names, surnames, documentType, document, email } = req.body;
    const student = new Student();

    student.names = names;
    student.surnames = surnames;
    student.documentType = documentType;
    student.document = document;
    student.email = email;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(student, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const studentRepository = getRepository(Student);
    try {
      await studentRepository.save(student);
    } catch (e) {
      return res.status(409).json({ message: 'Student already exist' });
    }
    // All ok
    res.status(201).json({ message: 'Student created' });
  };




  // **************************   UPDATE    **************************
  static edit = async (req: Request, res: Response) => {
    let student;
    const { id } = req.params;
    const { names, surnames, documentType, document, email } = req.body;

    const studentRepository = getRepository(Student);
    // Try get student
    try {
      student = await studentRepository.findOneOrFail(id);
      student.names = names;
      student.surnames = surnames;
      student.documentType = documentType;
      student.document = document;
      student.email = email;
    } catch (e) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(student, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save student
    try {
      await studentRepository.save(student);
    } catch (e) {
      return res.status(409).json({ message: 'Student already in use' });
    }

    res.status(201).json({ message: 'Student update' });
  };





  // **************************   DELETE    **************************
  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const studentRepository = getRepository(Student);
    let student: Student;

    try {
      await studentRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Remove student
    studentRepository.delete(id);
    res.status(201).json({ message: ' Student deleted' });
  };


}

export default StudentController;
