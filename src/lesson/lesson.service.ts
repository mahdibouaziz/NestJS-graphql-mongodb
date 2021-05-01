import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateLessonInput } from './dto/lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    try {
      return await this.lessonRepository.findOne({ id });
    } catch (e) {
      throw new NotFoundException('Lesson not found');
    }
  }

  async getLessons(): Promise<Lesson[]> {
    try {
      return await this.lessonRepository.find();
    } catch (e) {
      throw new NotFoundException("Sorry we can't retrive Lessons");
    }
  }

  async createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      ...lessonInput,
      id: uuidv4(),
    });
    try {
      return await this.lessonRepository.save(lesson);
    } catch (e) {
      throw new InternalServerErrorException('Cannot create an object');
    }
  }
}
