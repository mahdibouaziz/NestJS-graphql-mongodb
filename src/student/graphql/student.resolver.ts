/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentInput } from '../dto/student.input';
import { Student } from '../entities/student.entity';
import { StudentService } from '../student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query((returns) => [StudentType])
  students(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  student(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudent(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') studentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(studentInput);
  }
}
