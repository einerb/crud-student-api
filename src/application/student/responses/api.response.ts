import { IsNotEmpty, IsInt } from 'class-validator';

import { ERROR, GET_ERROR } from './api.error';
import { GET_SUCCESS } from './api.success';
import { IPagination } from '../../../domain/student/interfaces/pagination.interface';
import { PaginationVerifier } from '../../../common/paginaton-verified';

export class ApiResponseRecords {
  @IsNotEmpty()
  @IsInt()
  records: any[];

  @IsNotEmpty()
  @IsInt()
  elementsPerPage: number;

  @IsNotEmpty()
  @IsInt()
  page: number;

  @IsNotEmpty()
  @IsInt()
  totalPages: number;

  @IsNotEmpty()
  @IsInt()
  totalRecords: number;

  constructor(queryResult: any[], pagination: IPagination = null) {
    this.records = queryResult[0]['records'];
    this.elementsPerPage = queryResult[0]['records'].length;
    this.page = pagination ? parseInt(pagination.pageNumber.toString()) : 1;
    this.totalPages =
      pagination == null
        ? 1
        : Math.ceil(queryResult[1]['count'] / pagination.pageElements);
    this.totalRecords = parseInt(queryResult[1]['count']);
  }
}

export class ApiResponse<T = any> {
  @IsNotEmpty()
  @IsInt()
  code: number;

  @IsNotEmpty()
  @IsInt()
  message?: string;

  @IsNotEmpty()
  error?: any;

  @IsNotEmpty()
  data?: T;

  constructor(success: boolean, value: any, data: any = null) {
    const INCREMENT_FOR_SUCCESS = 1000;

    if (success) {
      let success = GET_SUCCESS(value);
      this.code = INCREMENT_FOR_SUCCESS + success.code;
      this.message = success.message;
      this.data = data;
    } else {
      let ex = GET_ERROR(value);
      this.code = ex.code;
      this.error = ex.error;
      if (data) this.data = data;
    }
  }

  static paginationNotProvidedError() {
    return new ApiResponse(
      false,
      ERROR.PAGINATION_WAS_NOT_PROVIDED,
      PaginationVerifier.defaultPaginationExample(),
    );
  }
}
