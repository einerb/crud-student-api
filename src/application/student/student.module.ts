import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentController } from './student.controller';
import { StudentRepository } from '../../domain/student/student.repository';
import { Student } from '../../domain/student/student.model';
import { StudentService } from 'src/domain/student/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports: [StudentService],
})
export class StudentModule {}
