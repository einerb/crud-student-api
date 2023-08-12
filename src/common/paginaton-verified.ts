import { IPagination } from '../domain/student/interfaces/pagination.interface';

export class PaginationVerifier {
  constructor() {}

  static verifyIPagination(p: IPagination): boolean {
    if (!p) return false;
    if (!p.pageNumber) return false;
    if (!p.pageElements) return false;
    return true;
  }

  static defaultPaginationExample() {
    return {
      description:
        'Este endpoint permite solo paginación por defecto, esta prop no es requerida',
      pageNumber:
        'Esta prop es *requerida* y hace referencia a la página solicitada',
      pageElements:
        'Esta prop es *requerida* y hace referencia al número máximo de elementos esperados en la página solicitada',
    };
  }

  static generateFormatError() {
    return {
      name: 'PAGINATION ERROR',
      message: 'El formato de paginación no es válido porque faltan props',
      example: PaginationVerifier.defaultPaginationExample(),
    };
  }
}
