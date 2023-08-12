import {
  CreateStudentDTO,
  UpdateStudentDTO,
} from 'src/application/student/dto';
import { IPagination } from 'src/domain/student/interfaces/pagination.interface';
import { ApiResponse } from 'src/application/student/responses';
import { Student } from '../student.model';

export interface StudentServiceInterface {
  createStudent(student: CreateStudentDTO): Promise<Student>;

  getStudents(
    pagination: IPagination,
  ): Promise<{ count: number; data: Student[] }>;

  updateStudent(id: number, data: UpdateStudentDTO): Promise<Student>;

  deleteStudent(id: number): Promise<Student>;
}
