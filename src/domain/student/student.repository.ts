import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './student.model';
import { CreateStudent, UpdateStudent, IPagination } from './interfaces';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(student: CreateStudent): Promise<Student> {
    return this.studentRepository.save(student);
  }

  async findAll(
    pagination: IPagination,
  ): Promise<{ count: number; data: Student[] }> {
    const skip =
      pagination.pageNumber > 0
        ? (pagination.pageNumber - 1) * pagination.pageElements
        : 0;

    const [data, count] = await this.studentRepository.findAndCount({
      where: {
        deletedAt: null,
      },
      skip: skip,
      take: pagination.pageElements,
      order: { createdAt: 'DESC' },
    });

    return { count, data };
  }

  async findById(identification: number): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        identification: identification,
        deletedAt: null,
      },
    });
  }

  async update(id: number, data: UpdateStudent): Promise<Student | undefined> {
    const studentToUpdate = await this.findById(id);
    if (!studentToUpdate) {
      return undefined;
    }

    if (!('identification' in data)) {
      Object.assign(studentToUpdate, data);
      return this.studentRepository.save(studentToUpdate);
    }

    return studentToUpdate;
  }

  async delete(id: number): Promise<Student | undefined> {
    const studentToDelete = await this.findById(id);
    if (!studentToDelete) {
      return undefined;
    }

    await this.studentRepository.softDelete({ identification: id });

    return studentToDelete;
  }
}
