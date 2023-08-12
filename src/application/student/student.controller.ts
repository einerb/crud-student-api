import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateStudentDTO, UpdateStudentDTO } from './dto';
import { StudentService } from 'src/domain/student/student.service';
import { IPagination } from './interfaces/pagination.interface';
import { ApiResponse, ApiResponseRecords, ERROR, SUCCESS } from './responses';
import { PaginationVerifier } from 'src/common/paginaton-verified';

@ApiTags('Students')
@Controller('v1/students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  async create(@Body() dto: CreateStudentDTO): Promise<ApiResponse> {
    const student = await this.studentService.createStudent(dto);

    if (!student) {
      return new ApiResponse(false, ERROR.STUDENT_EXISTS);
    }

    return new ApiResponse(true, SUCCESS.STUDENT_CREATED, student);
  }

  @Get()
  async get(@Query() pagination: IPagination): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationNotProvidedError();

    const students = await this.studentService.getStudents(pagination);

    return new ApiResponse(
      true,
      SUCCESS.STUDENTS,
      new ApiResponseRecords(
        [{ records: students.data }, { count: students.count }],
        pagination,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateStudentDTO,
  ): Promise<ApiResponse> {
    const student = await this.studentService.updateStudent(id, data);

    if (!student) {
      return new ApiResponse(false, ERROR.STUDENT_NOT_FOUND);
    }

    return new ApiResponse(true, SUCCESS.STUDENT_UPDATED, student);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ApiResponse> {
    const student = await this.studentService.deleteStudent(id);

    if (!student) {
      return new ApiResponse(false, ERROR.STUDENT_NOT_FOUND);
    }

    return new ApiResponse(true, SUCCESS.STUDENT_DELETED, student);
  }
}
