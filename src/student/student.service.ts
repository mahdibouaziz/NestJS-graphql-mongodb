import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/student.input';
import { Student } from './entities/student.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getStudent(id: string): Promise<Student> {
    try {
      return await this.studentRepository.findOne({ id });
    } catch (error) {
      throw new NotFoundException('Cannot found this student');
    }
  }

  async getStudents(): Promise<Student[]> {
    try {
      return await this.studentRepository.find();
    } catch (e) {
      throw new NotFoundException('Error while retriving students');
    }
  }

  async createStudent(studentInput: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      ...studentInput,
      id: uuidv4(),
    });
    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      throw new BadRequestException('Cannot create this user');
    }
  }
}
