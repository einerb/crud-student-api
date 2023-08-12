import { Injectable } from '@nestjs/common';

import { StudentRepository } from './student.repository';
import {
  CreateStudent,
  UpdateStudent,
  IPagination,
  StudentServiceInterface,
} from './interfaces';
import { Student } from './student.model';

@Injectable()
export class StudentService implements StudentServiceInterface {
  constructor(private readonly studentRepo: StudentRepository) {}

  async createStudent(student: CreateStudent): Promise<Student | undefined> {
    const studentFound = await this.studentRepo.findById(
      student.identification,
    );
    if (studentFound) {
      return undefined;
    }

    return await this.studentRepo.create(student);
  }

  async getStudents(
    pagination: IPagination,
  ): Promise<{ count: number; data: Student[] }> {
    return await this.studentRepo.findAll(pagination);
  }

  async updateStudent(
    id: number,
    data: UpdateStudent,
  ): Promise<Student | undefined> {
    const student = await this.studentRepo.update(id, data);

    if (!student) {
      return undefined;
    }

    return student;
  }

  async deleteStudent(id: number): Promise<Student | undefined> {
    const student = await this.studentRepo.delete(id);

    if (!student) {
      return undefined;
    }

    return student;
  }
}
